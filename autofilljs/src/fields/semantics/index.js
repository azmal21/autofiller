// import { normalizeText } from "../normalize/index.js";
import { normalizeText } from "../helpers/normalizeText.js";
export const FIELD_SEMANTICS = [
  {
    type: "first_name",
    alias: ["first name", "firstname", "given name", "fname"],
  },

  {
    type: "middle_name",
    alias: ["middle name", "middlename", "middle initial", "mname"],
  },

  {
    type: "last_name",
    alias: ["last name", "lastname", "surname", "family name"],
  },

  {
    type: "full_name",
    alias: ["full name", "fullname", "candidate name", "applicant name"],
  },

  {
    type: "email",
    alias: ["email", "email address", "mail", "contact email"],
  },

  {
    type: "phone",
    alias: ["phone", "phone number", "mobile number", "contact number"],
  },

  {
    type: "resume",
    alias: ["resume", "upload resume", "cv", "resume file"],
  },

  {
    type: "linkedin",
    alias: ["linkedin", "linkedin profile", "linkedin url", "linkedin link"],
  },

  {
    type: "portfolio",
    alias: [
      "portfolio",
      "portfolio website",
      "personal website",
      "github profile",
    ],
  },

  {
    type: "current_salary",
    alias: ["current salary", "current ctc", "present salary", "salary"],
  },

  {
    type: "expected_salary",
    alias: [
      "expected salary",
      "expected ctc",
      "salary expectation",
      "desired salary",
    ],
  },

  {
    type: "experience",
    alias: [
      "experience",
      "work experience",
      "years of experience",
      "professional experience",
    ],
  },

  {
    type: "current_company",
    alias: ["current company", "company name", "employer", "organization"],
  },

  {
    type: "college",
    alias: ["college", "college name", "university", "institution"],
  },

  {
    type: "degree",
    alias: ["degree", "qualification", "education", "course"],
  },

  {
    type: "graduation_year",
    alias: [
      "graduation year",
      "passing year",
      "year of graduation",
      "completion year",
    ],
  },

  {
    type: "cgpa",
    alias: ["cgpa", "gpa", "grade point", "academic score"],
  },

  {
    type: "skills",
    alias: ["skills", "technical skills", "skill set", "technologies"],
  },

  {
    type: "cover_letter",
    alias: [
      "cover letter",
      "motivation letter",
      "about yourself",
      "tell us about yourself",
    ],
  },

  {
    type: "date_of_birth",
    alias: ["date of birth", "dob", "birth date", "birthday"],
  },

  {
    type: "address",
    alias: ["address", "home address", "residential address", "street address"],
  },

  {
    type: "city",
    alias: ["city", "town", "city name", "current city"],
  },

  {
    type: "state",
    alias: ["state", "province", "region", "state name"],
  },

  {
    type: "country",
    alias: ["country", "country name", "nationality", "nation"],
  },

  {
    type: "pincode",
    alias: ["pincode", "pin code", "postal code", "zipcode"],
  },

  {
    type: "role",
    alias: ["role", "position", "job role", "desired role"],
  },

  {
    type: "sslc_marks",
    alias: ["sslc marks", "10th marks", "secondary marks", "sslc percentage"],
  },

  {
    type: "sslc_cgpa",
    alias: ["sslc cgpa", "10th cgpa", "secondary cgpa", "sslc grade"],
  },

  {
    type: "puc_marks",
    alias: [
      "puc marks",
      "12th marks",
      "pre university marks",
      "puc percentage",
    ],
  },

  {
    type: "puc_cgpa",
    alias: ["puc cgpa", "12th cgpa", "pre university cgpa", "puc grade"],
  },

  {
    type: "degree_marks",
    alias: [
      "degree marks",
      "graduation marks",
      "college marks",
      "degree percentage",
    ],
  },

  {
    type: "degree_cgpa",
    alias: ["degree cgpa", "graduation cgpa", "college cgpa", "degree grade"],
  },
];

// --------------------------------------------
// NORMALIZED SEARCHABLE alias
// --------------------------------------------
export const SEARCHABLE_FIELD_ALIASES = FIELD_SEMANTICS.flatMap((field) =>
  field.alias.map((a) => ({
    type: field.type,
    alias: normalizeText(a),
  })),
);
