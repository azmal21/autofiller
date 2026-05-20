import type { SemanticField } from "../types";
import { normalizeText } from "../utils/normalizeText";

export interface SemanticDefinition {
  semantic: SemanticField;
  aliases: string[];
  weight: number;
  inputHints?: string[];
}

export const FIELD_SEMANTICS: SemanticDefinition[] = [
  {
    semantic: "first_name",
    aliases: ["first name", "firstname", "given name", "fname"],
    weight: 1.05,
    inputHints: ["text"],
  },
  {
    semantic: "middle_name",
    aliases: ["middle name", "middle initial", "mname"],
    weight: 0.95,
  },
  {
    semantic: "last_name",
    aliases: ["last name", "lastname", "surname", "family name"],
    weight: 1.05,
  },
  {
    semantic: "full_name",
    aliases: ["full name", "candidate name", "applicant name", "your name"],
    weight: 1.15,
  },
  {
    semantic: "email",
    aliases: ["email", "email address", "mail", "contact email"],
    weight: 1.25,
    inputHints: ["email"],
  },
  {
    semantic: "phone",
    aliases: ["phone", "phone number", "mobile number", "contact number", "tel"],
    weight: 1.2,
    inputHints: ["tel"],
  },
  {
    semantic: "resume",
    aliases: ["resume", "upload resume", "cv", "resume file"],
    weight: 1.25,
    inputHints: ["file"],
  },
  {
    semantic: "linkedin",
    aliases: ["linkedin", "linkedin profile", "linkedin url", "linkedin link"],
    weight: 1.1,
  },
  {
    semantic: "github",
    aliases: ["github", "github profile", "github url", "github link"],
    weight: 1.05,
  },
  {
    semantic: "portfolio",
    aliases: ["portfolio", "portfolio website", "personal website", "website"],
    weight: 1.0,
  },
  {
    semantic: "current_salary",
    aliases: ["current salary", "current ctc", "present salary"],
    weight: 0.95,
  },
  {
    semantic: "expected_salary",
    aliases: ["expected salary", "expected ctc", "salary expectation", "desired salary"],
    weight: 1.0,
  },
  {
    semantic: "experience",
    aliases: ["experience", "work experience", "years of experience", "professional experience"],
    weight: 1.05,
  },
  {
    semantic: "current_company",
    aliases: ["current company", "company name", "employer", "organization"],
    weight: 1.0,
  },
  {
    semantic: "current_role",
    aliases: ["current role", "current title", "job title", "designation"],
    weight: 0.95,
  },
  {
    semantic: "college",
    aliases: ["college", "college name", "university", "institution"],
    weight: 0.9,
  },
  {
    semantic: "degree",
    aliases: ["degree", "qualification", "education", "course"],
    weight: 0.9,
  },
  {
    semantic: "graduation_year",
    aliases: ["graduation year", "passing year", "year of graduation", "completion year"],
    weight: 0.9,
  },
  {
    semantic: "cgpa",
    aliases: ["cgpa", "gpa", "grade point", "academic score"],
    weight: 1.0,
    inputHints: ["number"],
  },
  {
    semantic: "skills",
    aliases: ["skills", "technical skills", "skill set", "technologies"],
    weight: 1.0,
  },
  {
    semantic: "cover_letter",
    aliases: ["cover letter", "motivation letter", "about yourself", "tell us about yourself"],
    weight: 1.1,
    inputHints: ["textarea"],
  },
  {
    semantic: "date_of_birth",
    aliases: ["date of birth", "dob", "birth date", "birthday"],
    weight: 1.0,
    inputHints: ["date"],
  },
  {
    semantic: "address",
    aliases: ["address", "home address", "residential address", "street address"],
    weight: 1.05,
    inputHints: ["textarea"],
  },
  {
    semantic: "city",
    aliases: ["city", "town", "city name", "current city"],
    weight: 0.95,
  },
  {
    semantic: "state",
    aliases: ["state", "province", "region", "state name"],
    weight: 0.9,
  },
  {
    semantic: "country",
    aliases: ["country", "country name", "nationality", "nation"],
    weight: 0.9,
  },
  {
    semantic: "pincode",
    aliases: ["pincode", "pin code", "postal code", "zipcode", "zip code"],
    weight: 1.0,
  },
  {
    semantic: "role",
    aliases: ["role", "position", "job role", "desired role", "applying for"],
    weight: 1.05,
    inputHints: ["select"],
  },
];

export const SEARCHABLE_ALIASES = FIELD_SEMANTICS.flatMap((definition) =>
  definition.aliases.map((alias) => ({
    semantic: definition.semantic,
    alias: normalizeText(alias),
    weight: definition.weight,
    inputHints: definition.inputHints ?? [],
  })),
);
