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
extend("sameLength", {
  validate: (value, { other }) =>
    (!value && !other) || (value && other && value.length === other.length),
  message: i18n.t("validation.sameLength"),
  params: [{ name: "other", isTarget: true }]
});
extend("eachMax", {
  params: ["max"],
  message: i18n.t("validation.eachMax"),
  validate: (value, { max }) =>
    value && value.every(elem => elem.length <= Number(max))
});
extend("minLength", {
  params: ["length"],
  message: i18n.t("validation.minLength"),
  validate: (value, { length }) => value && value.length >= Number(length)
});
extend("criteria", {
  message: i18n.t("validation.criteria"),
  validate: value =>
    value &&
    value.filter((v, i) => {
      if (i + 1 < value.length && !v.junctor) {
        return true;
      }
      if (
        v.condition.left_entity &&
        v.condition.left_property &&
        v.condition.comparing_function &&
        v.condition.right_entity &&
        v.condition.right_property
      ) {
        return false;
      } else if (
        (v.condition.comparing_function === "IS_EMPTY" ||
          v.condition.comparing_function === "NOT_EMPTY") &&
        v.condition.left_entity &&
        v.condition.left_property &&
        v.condition.comparing_function
      ) {
        return false;
      }
      return true;
    }).length === 0
});
extend("strongPassword", {
  message: i18n.t("validation.strongPassword"),
  validate: value => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&.,\-_])(?=.{8,})/gm.test(
      value
    );
  }
});

// Install messages
configure({
  defaultMessage: (field, values) => {
    values._field_ = i18n.t(`fields.${field}`);
    return i18n.t(`validation.${values._rule_}`, values);
  }
});
