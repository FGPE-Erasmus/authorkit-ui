<template>
  <fgpe-card no-shadow>
    <ValidationObserver v-slot="{ invalid }">
      <div class="clearfix">
        <div class="vx-row">
          <div class="vx-col w-full mx-auto">
            <ValidationProvider
              rules="required|min:8|max:100"
              name="old_password"
              mode="eager"
              :persist="true"
              v-slot="{ errors }"
            >
              <vs-input
                type="password"
                name="old_password"
                :label-placeholder="$t('UserSettings.OldPassword')"
                v-model="old_password"
                class="w-full mt-6"
              />
              <span class="text-danger text-sm">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="vx-col w-full mx-auto">
            <ValidationProvider
              rules="required|min:8|max:100|strongPassword|password:confirmation"
              name="new_password"
              mode="eager"
              :persist="true"
              v-slot="{ errors }"
            >
              <vs-input
                ref="new_password"
                type="password"
                name="new_password"
                :label-placeholder="$t('UserSettings.NewPassword')"
                v-model="new_password"
                class="w-full mt-6"
              />
              <span class="text-danger text-sm">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="vx-col w-full mx-auto">
            <ValidationProvider
              rules="required"
              vid="confirmation"
              name="new_password_confirmation"
              mode="eager"
              :persist="true"
              v-slot="{ errors }"
            >
              <vs-input
                type="password"
                name="new_password_confirmation"
                :label-placeholder="$t('UserSettings.ConfirmNewPassword')"
                v-model="new_password_confirmation"
                class="w-full mt-6"
              />
              <span class="text-danger text-sm">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-end mt-12">
          <vs-button class="ml-auto mt-2" :disabled="invalid" @click="save()">{{
            $t("Form.Save")
          }}</vs-button>
          <vs-button
            class="ml-4 mt-2"
            type="border"
            color="warning"
            @click="resetForm()"
          >
            {{ $t("Form.Reset") }}
          </vs-button>
        </div>
      </div>
    </ValidationObserver>
  </fgpe-card>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

import {
  MODULE_BASE,
  USER_CHANGE_PASSWORD
} from "@/store/users/user.constants";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      old_password: "",
      new_password: "",
      new_password_confirmation: ""
    };
  },
  computed: {},
  methods: {
    resetForm() {
      this.old_password = "";
      this.new_password = "";
      this.new_password_confirmation = "";
    },
    save() {
      this.$store
        .dispatch(`${MODULE_BASE}/${USER_CHANGE_PASSWORD}`, {
          old_password: this.old_password,
          new_password: this.new_password
        })
        .then(() => {
          this.$vs.notify({
            title: this.$t("Messages.Success.PasswordChanged.Title"),
            text: this.$t("Messages.Success.PasswordChanged.Description"),
            iconPack: "mi",
            icon: "check_circle",
            color: "success"
          });
          this.resetForm();
        })
        .catch(err => {
          this.$vs.notify({
            title: this.$t("Messages.Error.PasswordNotChanged.Title"),
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    }
  }
};
</script>
