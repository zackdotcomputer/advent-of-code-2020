enum FieldId {
  byr = "byr",
  iyr = "iyr",
  eyr = "eyr",
  hgt = "hgt",
  hcl = "hcl",
  ecl = "ecl",
  pid = "pid",
  cid = "cid",
}

const requiredFields: FieldId[] = [
  FieldId.byr,
  FieldId.iyr,
  FieldId.eyr,
  FieldId.hgt,
  FieldId.hcl,
  FieldId.ecl,
  FieldId.pid,
];

export default class Passport {
  fields: Partial<Record<FieldId, string>>;

  constructor(encoded: string) {
    this.fields = {};

    encoded.split(/[ \n]/).forEach((d) => {
      const parts = d.split(":");
      if (parts.length === 2) {
        const key = FieldId[parts[0] as keyof typeof FieldId];
        this.fields[key] = parts[1];
      }
    });
  }

  hasRequiredFields(): boolean {
    for (let i = 0; i < requiredFields.length; i++) {
      const required = requiredFields[i];
      if (!this.fields[required]) {
        return false;
      }
    }

    return true;
  }

  isValid(): boolean {
    if (!this.hasRequiredFields()) {
      return false;
    }

    const birthyear = parseInt(this.fields.byr ?? "0");
    if (birthyear < 1920 || birthyear > 2002) {
      return false;
    }

    const issueYear = parseInt(this.fields.iyr ?? "0");
    if (issueYear < 2010 || issueYear > 2020) {
      return false;
    }

    const expiration = parseInt(this.fields.eyr ?? "0");
    if (expiration < 2020 || expiration > 2030) {
      return false;
    }

    const heightParts = /^(\d+)(cm|in)$/.exec(this.fields.hgt ?? "") ?? [];
    if (heightParts.length !== 3) {
      return false;
    }

    const height = parseInt(heightParts[1]);
    const unit = heightParts[2];
    if (unit === "cm") {
      if (height < 150 || height > 193) {
        return false;
      }
    } else if (unit === "in") {
      if (height < 59 || height > 76) {
        return false;
      }
    } else {
      return false;
    }

    const hairTest = /^\#([0-9a-f]{6})$/.test(this.fields.hcl ?? "");
    if (!hairTest) {
      return false;
    }

    if (
      ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(
        this.fields.ecl ?? ""
      ) === -1
    ) {
      return false;
    }

    if (!/^[0-9]{9}$/.test(this.fields.pid ?? "")) {
      return false;
    }

    console.debug("Was Valid\n", this.fields);

    return true;
  }
}
