class ValidateEmptyFields {
  constructor() { }

  public validate(data: Record<string, any>): string | null {
    // Find the first field that is undefined, null, or an empty string
    const missingField = Object.entries(data).find(
      ([_, value]) => value === undefined || value === null || value === ""
    )?.[0];

    return missingField || null;
  }
}

export default ValidateEmptyFields;
