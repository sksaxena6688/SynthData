import { faker } from "@faker-js/faker";

/**
 * Supported field types configuration.
 */
export const FIELD_TYPES = {
  "Full Name": {
    label: "Full Name",
    generate: () => faker.person.fullName(),
    example: "Arjun Takahashi",
  },
  "First Name": {
    label: "First Name",
    generate: () => faker.person.firstName(),
    example: "Elena",
  },
  "Last Name": {
    label: "Last Name",
    generate: () => faker.person.lastName(),
    example: "Rodriguez",
  },
  Email: {
    label: "Email Address",
    generate: () => faker.internet.email().toLowerCase(),
    example: "arjun.t@protonmail.com",
  },
  "Phone Number": {
    label: "Phone Number",
    generate: () => faker.phone.number(),
    example: "+1-555-0199",
  },
  Address: {
    label: "Street Address",
    generate: () => `${faker.location.streetAddress()}, ${faker.location.city()}`,
    example: "742 Evergreen Terrace, Springfield",
  },
  City: {
    label: "City",
    generate: () => faker.location.city(),
    example: "Springfield",
  },
  Country: {
    label: "Country",
    generate: () => faker.location.country(),
    example: "United States",
  },
  "ZIP Code": {
    label: "ZIP Code",
    generate: () => faker.location.zipCode(),
    example: "90210",
  },
  UUID: {
    label: "UUID v4",
    generate: () => faker.string.uuid(),
    example: "550e8400-e29b-41d4-a716-446655440000",
  },
  Company: {
    label: "Company",
    generate: () => faker.company.name(),
    example: "Stitch Technologies",
  },
  "Job Title": {
    label: "Job Title",
    generate: () => faker.person.jobTitle(),
    example: "Lead Systems Architect",
  },
  Date: {
    label: "Date",
    generate: () => {
      const date = faker.date.past({ years: 2 });
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    },
    example: "2024-05-12 14:02",
  },
  Boolean: {
    label: "Boolean",
    generate: () => (faker.datatype.boolean() ? "true" : "false"),
    example: "true",
  },
  Number: {
    label: "Number",
    generate: () => String(faker.number.int({ min: 100, max: 99999 })),
    example: "8822",
  },
  URL: {
    label: "URL",
    generate: () => faker.internet.url(),
    example: "https://stitch.dev",
  },
};

/**
 * Generates synthetic data based on the schema fields and desired rows.
 * @param {Array<{id: string, name: string, type: string}>} fields 
 * @param {number} rows 
 * @returns {Array<Object>}
 */
export function generateSyntheticData(fields, rows) {
  if (!fields || fields.length === 0) return [];
  
  const data = [];
  // Reset seed for consistency across schema changes or keep it dynamic? 
  // Keeping it dynamic represents real fake data, but let's make it stable or randomly seeded.
  for (let i = 0; i < rows; i++) {
    const row = {
      _index: String(i + 1).padStart(3, "0"),
    };
    
    fields.forEach((field) => {
      const typeConfig = FIELD_TYPES[field.type];
      if (typeConfig) {
        row[field.name] = typeConfig.generate();
      } else {
        row[field.name] = "";
      }
    });
    
    data.push(row);
  }
  
  return data;
}
