import { Card } from "@autofill/ui";

export function PlaygroundForm() {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-line bg-white/70 px-5 py-4">
        <div className="text-sm font-semibold">Mock Job Page</div>
        <div className="text-xs text-stone-500">Greenhouse-style application form inside the standalone app.</div>
      </div>
      <form data-playground-form className="grid gap-4 p-5">
        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1 text-sm font-medium">
            Full Name
            <input id="candidate-name" name="candidateName" placeholder="Your full legal name" className="h-10 rounded-md border border-line bg-white px-3 outline-none focus:border-accent" />
          </label>
          <label className="grid gap-1 text-sm font-medium">
            Email Address
            <input type="email" name="contactEmail" placeholder="name@example.com" className="h-10 rounded-md border border-line bg-white px-3 outline-none focus:border-accent" />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1 text-sm font-medium">
            Mobile Number
            <input type="tel" name="mobileNumber" placeholder="+91..." className="h-10 rounded-md border border-line bg-white px-3 outline-none focus:border-accent" />
          </label>
          <label className="grid gap-1 text-sm font-medium">
            LinkedIn Profile
            <input name="linkedinUrl" placeholder="https://linkedin.com/in/..." className="h-10 rounded-md border border-line bg-white px-3 outline-none focus:border-accent" />
          </label>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <label className="grid gap-1 text-sm font-medium">
            Current Company
            <input name="employer" className="h-10 rounded-md border border-line bg-white px-3 outline-none focus:border-accent" />
          </label>
          <label className="grid gap-1 text-sm font-medium">
            Years of Experience
            <input name="professionalExperience" className="h-10 rounded-md border border-line bg-white px-3 outline-none focus:border-accent" />
          </label>
          <label className="grid gap-1 text-sm font-medium">
            Applying For
            <select name="desiredRole" className="h-10 rounded-md border border-line bg-white px-3 outline-none focus:border-accent">
              <option value="">Select role</option>
              <option>Frontend Developer</option>
              <option>Full Stack Developer</option>
              <option>Software Intern</option>
            </select>
          </label>
        </div>

        <label className="grid gap-1 text-sm font-medium">
          Skills
          <input name="technicalSkillSet" placeholder="React, TypeScript, Node.js" className="h-10 rounded-md border border-line bg-white px-3 outline-none focus:border-accent" />
        </label>

        <label className="grid gap-1 text-sm font-medium">
          Cover Letter
          <textarea name="motivationLetter" rows={4} placeholder="Tell us why you are interested" className="rounded-md border border-line bg-white px-3 py-2 outline-none focus:border-accent" />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1 text-sm font-medium">
            Upload Resume
            <input type="file" name="cvFile" className="h-10 rounded-md border border-line bg-white px-3 py-2 text-sm" />
          </label>
          <label className="grid gap-1 text-sm font-medium">
            CGPA
            <input type="number" step="0.01" name="gradePointAverage" className="h-10 rounded-md border border-line bg-white px-3 outline-none focus:border-accent" />
          </label>
        </div>
      </form>
    </Card>
  );
}
