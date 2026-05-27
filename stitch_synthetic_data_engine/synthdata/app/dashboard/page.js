"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Papa from "papaparse";
import { 
  Play, 
  Trash2, 
  Plus, 
  Copy, 
  Download, 
  ArrowUp, 
  ArrowDown, 
  RefreshCw, 
  Database, 
  AlertCircle,
  ShieldCheck
} from "lucide-react";
import { FIELD_TYPES, generateSyntheticData } from "../utils/generator";

const DEFAULT_SCHEMA = [
  { id: "1", name: "user_id", type: "UUID" },
  { id: "2", name: "full_name", type: "Full Name" },
  { id: "3", name: "email", type: "Email" },
  { id: "4", name: "phone", type: "Phone Number" }
];

const TEMPLATES = {
  ecommerce: [
    { id: "t1", name: "customer_id", type: "UUID" },
    { id: "t2", name: "full_name", type: "Full Name" },
    { id: "t3", name: "email", type: "Email" },
    { id: "t4", name: "company", type: "Company" },
    { id: "t5", name: "city", type: "City" },
    { id: "t6", name: "country", type: "Country" },
    { id: "t7", name: "signup_date", type: "Date" }
  ],
  employee: [
    { id: "e1", name: "employee_id", type: "UUID" },
    { id: "e2", name: "first_name", type: "First Name" },
    { id: "e3", name: "last_name", type: "Last Name" },
    { id: "e4", name: "job_title", type: "Job Title" },
    { id: "e5", name: "email", type: "Email" },
    { id: "e6", name: "phone", type: "Phone Number" },
    { id: "e7", name: "hire_date", type: "Date" }
  ],
  saas: [
    { id: "s1", name: "event_id", type: "UUID" },
    { id: "s2", name: "user_id", type: "UUID" },
    { id: "s3", name: "page_url", type: "URL" },
    { id: "s4", name: "timestamp", type: "Date" },
    { id: "s5", name: "is_converted", type: "Boolean" },
    { id: "s6", name: "session_duration", type: "Number" }
  ]
};

export default function Dashboard() {
  return (
    <React.Suspense fallback={
      <div className="h-screen w-screen flex items-center justify-center bg-background text-on-surface">
        <div className="flex items-center gap-sm">
          <RefreshCw className="animate-spin text-primary" />
          <span className="font-label-caps text-label-caps uppercase">Loading Workspace...</span>
        </div>
      </div>
    }>
      <DashboardContent />
    </React.Suspense>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const templateKey = searchParams.get("template");

  // State Management
  const [datasetName, setDatasetName] = useState("user_registration_v1");
  const [rowCount, setRowCount] = useState(1000);
  const [batchMode, setBatchMode] = useState("Standard");
  const [fields, setFields] = useState(DEFAULT_SCHEMA);
  
  const [generatedData, setGeneratedData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [latency, setLatency] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Initialize from LocalStorage or template params
  useEffect(() => {
    // If a template key is passed, apply it first
    if (templateKey && TEMPLATES[templateKey]) {
      setFields(TEMPLATES[templateKey]);
      setDatasetName(`${templateKey}_dataset_v1`);
      return;
    }

    // Otherwise look in localStorage
    try {
      const savedSchema = localStorage.getItem("synthdata_schema");
      const savedName = localStorage.getItem("synthdata_name");
      const savedRowCount = localStorage.getItem("synthdata_rowcount");
      
      if (savedSchema) setFields(JSON.parse(savedSchema));
      if (savedName) setDatasetName(savedName);
      if (savedRowCount) setRowCount(parseInt(savedRowCount, 10) || 1000);
    } catch (e) {
      console.error("Failed to load schema from localStorage", e);
    }
  }, [templateKey]);

  // Persist State Changes
  useEffect(() => {
    if (!templateKey) {
      try {
        localStorage.setItem("synthdata_schema", JSON.stringify(fields));
        localStorage.setItem("synthdata_name", datasetName);
        localStorage.setItem("synthdata_rowcount", String(rowCount));
      } catch (e) {
        console.error("Failed to save schema to localStorage", e);
      }
    }
  }, [fields, datasetName, rowCount, templateKey]);

  // Field Handlers
  const addField = () => {
    const newId = String(Date.now());
    const newField = {
      id: newId,
      name: `field_${fields.length + 1}`,
      type: "Full Name"
    };
    setFields([...fields, newField]);
  };

  const deleteField = (id) => {
    if (fields.length <= 1) {
      setValidationError("A schema must contain at least 1 field.");
      setTimeout(() => setValidationError(""), 3000);
      return;
    }
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id, key, value) => {
    setFields(fields.map(f => {
      if (f.id === id) {
        // Sanitize field name to avoid spaces/special characters
        if (key === "name") {
          const sanitized = value.toLowerCase().replace(/[^a-z0-9_]/g, "");
          return { ...f, [key]: sanitized };
        }
        return { ...f, [key]: value };
      }
      return f;
    }));
  };

  const moveField = (index, direction) => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === fields.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const newFields = [...fields];
    const temp = newFields[index];
    newFields[index] = newFields[targetIndex];
    newFields[targetIndex] = temp;
    setFields(newFields);
  };

  // Generation Logic
  const handleGenerate = () => {
    // Validation Checks
    if (!datasetName.trim()) {
      setValidationError("Dataset Name is required.");
      return;
    }
    if (rowCount <= 0 || rowCount > 50000) {
      setValidationError("Row count must be between 1 and 50,000.");
      return;
    }
    
    // Check for duplicate field names
    const fieldNames = fields.map(f => f.name.trim());
    const hasDuplicates = fieldNames.some((name, idx) => fieldNames.indexOf(name) !== idx);
    if (hasDuplicates) {
      setValidationError("Field names must be unique.");
      return;
    }
    
    // Check for empty field names
    const hasEmpty = fieldNames.some(name => name === "");
    if (hasEmpty) {
      setValidationError("Field names cannot be empty.");
      return;
    }

    setValidationError("");
    setIsGenerating(true);

    const startTime = performance.now();

    setTimeout(() => {
      try {
        const data = generateSyntheticData(fields, rowCount);
        setGeneratedData(data);
        const endTime = performance.now();
        setLatency(Math.round(endTime - startTime));
        setHasGenerated(true);
      } catch (err) {
        console.error("Data synthesis failed", err);
        setValidationError("Generation failed due to invalid schema configuration.");
      } finally {
        setIsGenerating(false);
      }
    }, 400); // Small delay to show smooth transitions
  };

  // Copy JSON
  const handleCopyJSON = () => {
    if (generatedData.length === 0) return;
    
    // Remove the internal _index metadata field before copying
    const cleanData = generatedData.map(({ _index, ...rest }) => rest);
    const jsonString = JSON.stringify(cleanData, null, 2);

    navigator.clipboard.writeText(jsonString)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error("Copy failed", err);
      });
  };

  // Export CSV
  const handleExportCSV = () => {
    if (generatedData.length === 0) return;

    // Remove metadata fields from the export
    const cleanData = generatedData.map(({ _index, ...rest }) => rest);
    const csv = Papa.unparse(cleanData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${datasetName}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export JSON
  const handleExportJSON = () => {
    if (generatedData.length === 0) return;

    // Remove metadata fields from the export
    const cleanData = generatedData.map(({ _index, ...rest }) => rest);
    const jsonString = JSON.stringify(cleanData, null, 2);

    const blob = new Blob([jsonString], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${datasetName}.json`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen md:h-screen md:overflow-hidden flex flex-col selection:bg-primary selection:text-on-primary">
      {/* TopNavBar */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-outline-variant w-full z-50 flex-shrink-0">
        <div className="flex justify-between items-center h-16 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-md md:gap-lg">
            <Link href="/" className="flex items-center gap-sm font-display text-headline-md tracking-tighter text-primary group select-none">
              <img src="/logo.png" alt="SynthData Logo" className="w-6 h-6 object-contain" />
              <span className="text-[18px] md:text-headline-md">SynthData</span>
            </Link>
            <nav className="hidden md:flex gap-sm md:gap-md items-center ml-4 md:ml-lg">
              <Link className="text-on-surface-variant hover:text-primary transition-colors duration-150 font-body-md" href="/">Home</Link>
              <span className="text-outline-variant font-mono-data">/</span>
              <span className="text-primary font-semibold font-body-md">Workspace</span>
            </nav>
          </div>
          <div className="flex items-center gap-sm">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-block px-md py-base font-body-md text-on-surface-variant hover:text-primary transition-colors">GitHub</a>
            <Link
              href="/"
              className="bg-primary text-on-primary font-body-md text-body-md px-md md:px-lg py-sm rounded-lg transition-all duration-150 hover:bg-zinc-800 flex items-center justify-center font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary text-sm md:text-base hover:translate-y-[-1px] active:translate-y-[1px] active:scale-[0.98]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="flex-1 md:min-h-0 flex flex-col md:flex-row md:overflow-hidden w-full">
        {/* Left Panel: Schema Controls */}
        <aside className="w-full md:w-80 border-b md:border-b-0 md:border-r border-outline-variant bg-surface-container-lowest flex flex-col p-md md:p-lg gap-md md:gap-lg overflow-y-visible md:overflow-y-auto custom-scrollbar flex-shrink-0">
          <div className="space-y-sm">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Project Configuration</span>
            
            {/* Inline validation messages */}
            {validationError && (
              <div className="p-sm bg-error-container text-on-error-container rounded-lg flex items-start gap-xs text-[12px] animate-fade-in border border-error/20">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-[1px]" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="space-y-base">
              <label className="block font-label-caps text-label-caps text-on-surface-variant opacity-70">Dataset Name</label>
              <input 
                className="w-full bg-surface-container border border-outline-variant rounded-lg p-sm focus:border-primary focus:ring-0 outline-none text-body-md transition-colors" 
                type="text" 
                value={datasetName}
                onChange={(e) => setDatasetName(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-sm">
              <div className="space-y-base">
                <label className="block font-label-caps text-label-caps text-on-surface-variant opacity-70">Rows</label>
                <input 
                  className="w-full bg-surface-container border border-outline-variant rounded-lg p-sm focus:border-primary focus:ring-0 outline-none text-body-md" 
                  type="number" 
                  min="1"
                  max="50000"
                  value={rowCount}
                  onChange={(e) => setRowCount(parseInt(e.target.value, 10) || "")}
                />
              </div>
              <div className="space-y-base">
                <label className="block font-label-caps text-label-caps text-on-surface-variant opacity-70">Batching</label>
                <select 
                  className="w-full bg-surface-container border border-outline-variant rounded-lg p-sm focus:border-primary focus:ring-0 outline-none text-body-md appearance-none"
                  value={batchMode}
                  onChange={(e) => setBatchMode(e.target.value)}
                >
                  <option value="Standard">Standard</option>
                  <option value="Stream">Stream</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-md flex-1">
            <div className="flex justify-between items-center">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Schema Fields</span>
              <span className="text-mono-data text-[11px] bg-secondary-container text-on-secondary-container px-base py-[2px] rounded">
                {fields.length} {fields.length === 1 ? "Field" : "Fields"}
              </span>
            </div>

            <div className="space-y-sm" id="field-list">
              {fields.map((field, idx) => (
                <div key={field.id} className="p-sm bg-surface border border-outline-variant rounded-lg space-y-sm relative group/field">
                  <div className="flex justify-between items-start gap-xs">
                    <input 
                      className="bg-transparent border-none p-0 text-body-md font-semibold focus:ring-0 w-2/3 outline-none focus:outline-none" 
                      type="text" 
                      value={field.name}
                      placeholder="field_name"
                      onChange={(e) => updateField(field.id, "name", e.target.value)}
                    />
                    <div className="flex items-center gap-[2px]">
                      <button 
                        onClick={() => moveField(idx, "up")}
                        disabled={idx === 0}
                        className="text-on-surface-variant opacity-40 hover:opacity-100 disabled:opacity-20 transition-opacity p-[2px]"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => moveField(idx, "down")}
                        disabled={idx === fields.length - 1}
                        className="text-on-surface-variant opacity-40 hover:opacity-100 disabled:opacity-20 transition-opacity p-[2px]"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => deleteField(field.id)}
                        className="text-on-surface-variant hover:text-error transition-colors p-[2px]"
                        title="Delete Field"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  
                  <select 
                    className="w-full text-mono-data bg-surface-container-low border-none rounded-lg p-xs focus:ring-0 outline-none text-[12px] cursor-pointer"
                    value={field.type}
                    onChange={(e) => updateField(field.id, "type", e.target.value)}
                  >
                    {Object.keys(FIELD_TYPES).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <button 
              onClick={addField}
              className="w-full border border-dashed border-outline-variant hover:border-primary py-sm rounded-lg transition-colors flex items-center justify-center gap-sm group cursor-pointer"
            >
              <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-label-caps text-label-caps">Add Field</span>
            </button>
          </div>

          <div className="mt-auto pt-lg border-t border-outline-variant space-y-sm bg-surface-container-lowest">
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-primary text-on-primary py-md rounded-lg font-semibold flex items-center justify-center gap-md hover:bg-zinc-800 transition-colors disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
              id="btn-generate"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Synthesizing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  Generate Dataset
                </>
              )}
            </button>
            <div className="flex items-center gap-xs text-[11px] text-on-surface-variant opacity-60 px-xs justify-center">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>All generation occurs locally in your browser</span>
            </div>
          </div>
        </aside>

        {/* Right Panel: Dataset Preview */}
        <section className="flex-1 md:min-h-0 flex flex-col bg-surface md:overflow-hidden">
          {/* Table Controls */}
          <div className="h-auto md:h-12 border-b border-outline-variant flex flex-col sm:flex-row sm:items-center sm:justify-between p-sm sm:px-lg bg-surface-container-lowest gap-sm flex-shrink-0">
            <div className="flex items-center gap-md">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-[11px] md:text-[12px]">Live Preview</span>
              <div className="h-1.5 w-1.5 bg-outline-variant rounded-full"></div>
              <span className="text-mono-data text-[11px] md:text-[12px] text-on-surface-variant">
                {hasGenerated 
                  ? `Showing ${Math.min(12, generatedData.length)} of ${rowCount.toLocaleString()} rows` 
                  : "No data generated"
                }
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-xs sm:gap-sm">
              <button 
                onClick={handleCopyJSON}
                disabled={!hasGenerated}
                className="flex items-center gap-xs px-sm py-xs border border-outline-variant rounded-lg hover:bg-surface-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs sm:text-[13px]"
              >
                <Copy className="w-3.5 h-3.5" />
                <span className="font-label-caps text-[11px]">
                  {copySuccess ? "Copied!" : "Copy JSON"}
                </span>
              </button>
              
              <div className="hidden sm:block w-[1px] h-4 bg-outline-variant mx-xs"></div>
              
              <button 
                onClick={handleExportCSV}
                disabled={!hasGenerated}
                className="flex items-center gap-xs px-sm py-xs bg-secondary-container text-on-secondary-container rounded-lg hover:bg-secondary-fixed transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs sm:text-[13px]"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="font-label-caps text-[11px]">Export CSV</span>
              </button>

              <button 
                onClick={handleExportJSON}
                disabled={!hasGenerated}
                className="flex items-center gap-xs px-sm py-xs bg-surface-container border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs sm:text-[13px]"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="font-label-caps text-[11px]">Export JSON</span>
              </button>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 md:min-h-0 overflow-auto custom-scrollbar relative bg-surface-container-low/30" id="preview-area">
            {/* Empty State */}
            {!hasGenerated && (
              <div className="absolute inset-0 flex items-center justify-center bg-surface-container-lowest/50 backdrop-blur-[1px] z-10" id="empty-state">
                <div className="text-center space-y-md max-w-sm px-md">
                  <div className="w-16 h-16 bg-surface-container mx-auto rounded-full flex items-center justify-center border border-outline-variant">
                    <Database className="w-8 h-8 text-on-surface-variant opacity-60" />
                  </div>
                  <h3 className="font-headline-md text-on-surface">No Data Synthesized</h3>
                  <p className="text-on-surface-variant text-body-md opacity-70 text-sm md:text-base">
                    Configure your schema on the left and click "Generate Dataset" to preview rows here.
                  </p>
                </div>
              </div>
            )}

            {/* Preview Table */}
            {hasGenerated && (
              <div className="w-full">
                <table className="w-full text-left border-collapse min-w-[800px] table-fixed">
                  <thead className="sticky top-0 bg-surface-container-lowest z-20 border-b border-outline-variant shadow-sm">
                    <tr>
                      <th className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase bg-surface-container-lowest w-20">
                        Index
                      </th>
                      {fields.map((field) => (
                        <th key={field.id} className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase bg-surface-container-lowest overflow-hidden text-ellipsis whitespace-nowrap">
                          {field.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {generatedData.slice(0, 12).map((row, idx) => (
                      <tr 
                        key={idx} 
                        className={`hover:bg-surface-container-low transition-colors group ${
                          idx % 2 === 0 ? "bg-surface" : "bg-surface-container-lowest"
                        }`}
                      >
                        <td className="p-md text-mono-data text-on-surface-variant opacity-60 font-semibold">
                          {row._index}
                        </td>
                        {fields.map((field) => (
                          <td 
                            key={field.id} 
                            className={`p-md overflow-hidden text-ellipsis whitespace-nowrap ${
                              field.type === "UUID" || field.type === "Email" || field.type === "Phone Number" || field.type === "Date"
                                ? "text-mono-data font-medium text-[13px]" 
                                : "font-body-md"
                            }`}
                          >
                            {row[field.name]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {generatedData.length > 12 && (
                  <div className="p-md text-center bg-surface-container-low/40 border-t border-outline-variant/30">
                    <span className="text-[11px] md:text-[12px] font-label-caps uppercase text-on-surface-variant opacity-60">
                      ... Preview truncated to first 12 rows. Export full dataset above ...
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Dashboard Analytics / Status Bar */}
          <div className="h-10 border-t border-outline-variant bg-surface-container-low flex items-center justify-between px-lg flex-shrink-0 select-none">
            <div className="flex items-center gap-lg">
              <div className="flex items-center gap-xs">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[11px] font-mono-data text-on-surface-variant font-semibold">LOCAL ENGINE</span>
              </div>
              <span className="text-[11px] font-mono-data text-on-surface-variant opacity-75">
                LATENCY: {hasGenerated ? `${latency}ms` : "--"}
              </span>
            </div>
            <div className="flex items-center gap-md">
              <span className="text-[11px] font-mono-data text-on-surface-variant opacity-50">v0.8</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant py-sm z-50 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto gap-md w-full text-center md:text-left">
          <span className="font-label-caps text-[11px] text-on-surface-variant opacity-70 uppercase tracking-tighter select-none">
            © 2024 SynthData. Built for precision.
          </span>
          <div className="flex gap-lg justify-center">
            <Link className="text-[11px] font-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase" href="/">Home</Link>
            <a className="text-[11px] font-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase" href="https://github.com">GitHub</a>
            <Link className="text-[11px] font-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase" href="/#privacy">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
