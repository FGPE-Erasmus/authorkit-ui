<template>
  <fgpe-card no-shadow>
    <div class="flex flex-wrap items-center mb-base">
      <vs-avatar
        :src="editUser.profile_img"
        size="96px"
        class="mr-4 mb-4 huge con-vs-avatar-primary"
        :text="name"
        @click="$refs.avatarUpload.click()"
      />
      <div>
        <vs-button
          class="mr-4 sm:mb-0 mb-2"
          @click="$refs.avatarUpload.click()"
        >
          {{ $t("UserSettings.UploadPhoto") }}
        </vs-button>
        <vs-button
          v-if="editUser.profile_img"
          type="border"
          color="danger"
          @click="removeAvatar"
        >
          {{ $t("UserSettings.RemovePhoto") }}
        </vs-button>
        <p class="text-sm mt-2">{{ $t("UserSettings.HintPhoto") }}</p>
      </div>
      <input
        type="file"
        hidden
        ref="avatarUpload"
        name="avatarUpload"
        @change="onAvatarUploadChange($event.target.files)"
        style="display:none"
        accept="image/png,image/jpeg,image/jpg,image/gif"
      />
    </div>

    <ValidationObserver v-slot="{ invalid }">
      <div class="clearfix">
        <div class="vx-row">
          <div class="vx-col w-full sm:w-full md:w-full lg:w-1/2 mx-auto">
            <ValidationProvider
              rules="required"
              name="firstname"
              mode="eager"
              :persist="true"
              v-slot="{ errors }"
            >
              <vs-input
                :label-placeholder="$t('UserSettings.FirstName')"
                name="firstname"
                v-model="editUser.first_name"
                class="w-full"
              />
              <span class="text-danger text-sm">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="vx-col w-full sm:w-full md:w-full lg:w-1/2 mx-auto">
            <ValidationProvider
              rules="required"
              name="lastname"
              mode="eager"
              :persist="true"
              v-slot="{ errors }"
            >
              <vs-input
                :label-placeholder="$t('UserSettings.LastName')"
                name="lastname"
                v-model="editUser.last_name"
                class="w-full"
              />
              <span class="text-danger text-sm">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>

        <ValidationProvider
          rules="required|email|min:3"
          name="email"
          mode="eager"
          :persist="true"
          v-slot="{ errors }"
        >
          <vs-input
            name="email"
            type="email"
            :label-placeholder="$t('UserSettings.Email')"
            v-model="editUser.email"
            class="w-full mt-6"
            disabled="true"
          />
          <span class="text-danger text-sm">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          rules="max:200"
          name="institution"
          mode="eager"
          :persist="true"
          v-slot="{ errors }"
        >
          <vs-input
            :label-placeholder="$t('UserSettings.Institution')"
            name="institution"
            v-model="editUser.institution"
            class="w-full mt-6"
          />
          <span class="text-danger text-sm">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          rules="max:100"
          name="country"
          mode="eager"
          :persist="true"
          v-slot="{ errors }"
        >
          <fgpe-country-select
            :label-placeholder="$t('UserSettings.Country')"
            name="country"
            v-model="editUser.country"
            class="w-full mt-6"
          />
          <span class="text-danger text-sm">{{ errors[0] }}</span>
        </ValidationProvider>
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
    </ValidationObserver>
  </fgpe-card>
</template>

<script>
import { mapState } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";

import { MODULE_BASE, USER_UPDATE } from "@/store/users/user.constants";

import FgpeCountrySelect from "@/components/FgpeCountrySelect";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    "fgpe-country-select": FgpeCountrySelect
  },
  data() {
    return {
      editUser: {}
    };
  },
  computed: {
    ...mapState({
      lights: state => state.theme_settings.lights,
      user: state => state.auth.profile
    }),

    name() {
      return this.user.first_name + " " + this.user.last_name;
    }
  },
  watch: {
    user() {
      this.resetForm();
    }
  },
  created() {
    this.resetForm();
  },
  methods: {
    replaceUndefinedOrNull(key, value) {
      if (value === null || value === undefined) {
        return undefined;
      }

      return value;
    },
    onAvatarUploadChange(files) {
      if (files.length === 0) {
        return;
      }
      const avatarFile = files[0];

      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          // convert image file to base64 string
          this.$set(this.editUser, "profile_img", reader.result);
        },
        false
      );
      if (avatarFile) {
        const maxAllowedSize = 500 * 1024;
        if (avatarFile.size > maxAllowedSize) {
          return;
        }
        reader.readAsDataURL(avatarFile);
      }
    },
    removeAvatar() {
      this.$set(this.editUser, "profile_img", null);
    },
    resetForm() {
      this.editUser = JSON.parse(
        JSON.stringify(this.user, this.replaceUndefinedOrNull)
      );
    },
    save() {
      this.$store
        .dispatch(`${MODULE_BASE}/${USER_UPDATE}`, {
          id: this.editUser.id,
          partial: this.editUser
        })
        .then(() => {
          this.$vs.notify({
            title: this.$t("Messages.Success.ProfileSaved.Title"),
            text: this.$t("Messages.Success.ProfileSaved.Description"),
            iconPack: "mi",
            icon: "check_circle",
            color: "success"
          });
        })
        .catch(err => {
          this.$vs.notify({
            title: this.$t("Messages.Error.ProfileNotSaved.Title"),
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
