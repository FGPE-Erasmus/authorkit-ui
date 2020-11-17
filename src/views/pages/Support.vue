<template>
  <div>
    <div class="flex mb-base vx-row">
      <div
        class="vx-col w-full sm:w-full md:w-full lg:w-1/2 mx-auto my-4 lg:my-0"
      >
        <fgpe-card class="h-full">
          <h4 class="mb-4">{{ $t("Support.Partners.Title") }}</h4>
          <div class="flex items-center my-2">
            <ul>
              <li>{{ $t("Support.Partners.Poland") }}</li>
              <li>{{ $t("Support.Partners.Porto") }}</li>
              <li>{{ $t("Support.Partners.Denmark") }}</li>
              <li>{{ $t("Support.Partners.Italy") }}</li>
            </ul>
          </div>
        </fgpe-card>
      </div>
      <div
        class="vx-col w-full sm:w-full md:w-full lg:w-1/2 mx-auto mt-4 lg:mt-0"
      >
        <fgpe-card class="h-full">
          <h4 class="mb-4">{{ $t("Support.Information.Title") }}</h4>
          <div class="flex items-center my-2">
            <vs-icon icon="place" icon-pack="mi md-16" class="mr-2"></vs-icon>
            <span>{{ $t("Support.Information.Address") }}</span>
          </div>
          <div class="flex items-center my-2">
            <vs-icon icon="email" icon-pack="mi md-16" class="mr-2"></vs-icon>
            <a href="mailto:jakub.swacha@usz.edu.pl" target="_blank"
              >jakub.swacha@usz.edu.pl</a
            >
          </div>
          <div class="flex items-center my-2">
            <vs-icon icon="public" icon-pack="mi md-16" class="mr-2"></vs-icon>
            <a href="http://fgpe.usz.edu.pl" target="_blank"
              >http://fgpe.usz.edu.pl</a
            >
          </div>
        </fgpe-card>
      </div>
    </div>
    <fgpe-card id="contact-form">
      <h4 class="mb-8">{{ $t("Support.Form.Title") }}</h4>

      <ValidationObserver v-slot="{ invalid }">
        <div class="clearfix">
          <!--<div class="vx-row">
            <div class="vx-col w-full sm:w-full md:w-full lg:w-1/2 mx-auto">
              <ValidationProvider
                rules="required"
                name="firstname"
                mode="eager"
                :persist="true"
                v-slot="{ errors }"
              >
                <vs-input
                  :label-placeholder="$t('Support.Form.FirstName')"
                  name="firstname"
                  v-model="Support.firstname"
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
                  :label-placeholder="$t('Support.Form.LastName')"
                  name="lastname"
                  v-model="Support.lastname"
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
              :label-placeholder="$t('Support.Form.Email')"
              v-model="contact.email"
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
              :label-placeholder="$t('Support.Form.Institution')"
              name="institution"
              v-model="contact.institution"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{ errors[0] }}</span>
          </ValidationProvider>-->

          <ValidationProvider
            rules="required|max:250"
            name="subject"
            mode="eager"
            :persist="true"
            v-slot="{ errors }"
          >
            <vs-input
              :label-placeholder="$t('Support.Form.Subject')"
              name="subject"
              v-model="contact.subject"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider
            rules="required|max:1000"
            name="description"
            mode="eager"
            :persist="true"
            v-slot="{ errors }"
          >
            <vs-textarea
              :label="$t('Support.Form.Description')"
              name="description"
              v-model="contact.description"
              :class="{
                hasValue: !!contact.description
              }"
              class="mt-5 w-full"
              counter="1000"
            />
            <span class="text-danger text-sm">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="flex flex-wrap items-center justify-end mt-12">
          <vs-button class="ml-auto mt-2" :disabled="invalid" @click="send()">{{
            $t("Form.Send")
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
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

import {
  MODULE_BASE,
  CONTACT_SEND_MESSAGE
} from "@/store/contact/contact.constants";

export default {
  name: "contact",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      empty: {
        firstname: "",
        lastname: "",
        email: "",
        institution: "",
        subject: "",
        description: ""
      },
      contact: {}
    };
  },
  mounted() {
    this.contact = Object.assign({}, this.empty);
  },
  methods: {
    send() {
      this.$store
        .dispatch(`${MODULE_BASE}/${CONTACT_SEND_MESSAGE}`, { ...this.contact })
        .then(() => {
          this.$vs.notify({
            title: this.$t("Messages.Success.SupportMessage.Title"),
            text: this.$t("Messages.Success.SupportMessage.Description"),
            iconPack: "mi",
            icon: "check_circle",
            color: "success"
          });
          this.resetForm();
        })
        .catch(err => {
          this.$vs.notify({
            title: this.$t("Messages.Error.SupportMessage.Title"),
            text: this.$t("Messages.Error.SupportMessage.Description", {
              reason: err.message
            }),
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },
    resetForm() {
      this.contact = Object.assign({}, this.empty);
    }
  }
};
</script>

<style scoped></style>
