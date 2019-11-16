import { extend, configure } from "vee-validate";
import { min, max, required, email } from "vee-validate/dist/rules";
import i18n from "./i18n/i18n";

// Install rules
extend("required", required);
extend("min", min);
extend("max", max);
extend("email", email);
extend("password", {
  validate: (value, { other }) => value === other,
  message: i18n.t("validation.passwordConfirmation"),
  params: [{ name: "other", isTarget: true }]
});
extend("eachMax", {
  params: ["max"],
  message: i18n.t("validation.eachMax"),
  validate: (value, { max }) => value && value.every(elem => elem.length <= max)
});

// Install messages
configure({
  defaultMessage: (field, values) => {
    values._field_ = i18n.t(`fields.${field}`);
    return i18n.t(`validation.${values._rule_}`, values);
  }
});
