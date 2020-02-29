<template>
  <vs-popup
    class="fgpe-share-popup"
    :title="title || $t('SharePopup.Title')"
    :active.sync="activeLocal"
    icon-pack="mi"
  >
    <div class="flex flex-col h-full">
      <ValidationObserver v-slot="{ invalid }" class="flex flex-col">
        <div class="flex flex-row">
          <div class="flex flex-grow mr-4 items-start">
            <ValidationProvider
              v-if="view === 'new'"
              name="email"
              rules="required|email"
              v-slot="{ errors }"
              persist
              class="w-full"
            >
              <vs-input
                name="email"
                v-model="email"
                :label-placeholder="$t('SharePopup.Email')"
                class="w-full"
              />
              <span v-show="errors[0]" class="text-danger text-sm">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
            <div v-if="view === 'edit'" class="flex flex-col w-full h-full">
              <span class="w-full label">
                {{ $t("SharePopup.User") }}
              </span>
              <span class="flex flex-grow w-full items-center">
                {{ editTarget.first_name }} {{ editTarget.last_name }}
              </span>
            </div>
          </div>
          <div class="flex flex-grow items-start">
            <ValidationProvider
              name="access_level"
              rules="required"
              v-slot="{ errors }"
              persist
              class="w-full"
            >
              <fgpe-select
                name="access_level"
                v-model="access_level"
                class="mt-5 w-full select-large"
                :options="access_levels"
                :clearable="false"
                :reduce="o => o.id"
                :label-placeholder="$t('SharePopup.AccessLevel')"
              >
              </fgpe-select>
              <span v-show="errors[0]" class="text-danger text-sm">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
        </div>
        <div class="flex w-full items-center justify-end my-2">
          <vs-button
            v-if="view === 'edit'"
            class="float-right vs-button-border mr-4"
            @click="createView"
            >{{ $t("SharePopup.Cancel") }}</vs-button
          >
          <vs-button class="float-right" :disabled="invalid" @click="onSave">{{
            $t("SharePopup.Save")
          }}</vs-button>
        </div>
      </ValidationObserver>
      <div class="flex-grow share-list">
        <ul>
          <li class="header">
            <span class="user">{{ $t("SharePopup.User") }}</span>
            <span class="level">{{ $t("SharePopup.AccessLevel") }}</span>
            <span class="actions"></span>
          </li>
          <li v-for="share in shares" :key="share.id">
            <span class="user"
              >{{ share.first_name }} {{ share.last_name }}</span
            >
            <span class="level">
              {{ getLabelForAccessLevel(share.access_level) }}
            </span>
            <span class="actions">
              <feather-icon
                v-if="share.access_level !== '4' && share.id !== profile.id"
                icon="EditIcon"
                svgClasses="h-4 w-4"
                class="cursor-pointer"
                @click="editView(share)"
              />
              <feather-icon
                v-if="share.access_level !== '4' && share.id !== profile.id"
                icon="TrashIcon"
                svgClasses="h-4 w-4"
                class="cursor-pointer text-danger"
                @click="onRemove(share)"
              />
            </span>
          </li>
        </ul>
      </div>
    </div>
  </vs-popup>
</template>

<script>
import { mapState } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";

import FgpeSelect from "@/components/FgpeSelect";

export default {
  name: "fgpe-share-popup",
  components: {
    ValidationObserver,
    ValidationProvider,
    "fgpe-select": FgpeSelect
  },
  props: {
    title: String,
    active: {
      type: Boolean,
      default: false
    },
    shares: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      view: "new",
      access_levels: [
        { id: 1, label: this.$t("SharePopup.AccessLevels.Viewer") },
        { id: 2, label: this.$t("SharePopup.AccessLevels.Contributor") },
        { id: 3, label: this.$t("SharePopup.AccessLevels.Admin") }
      ],
      email: "",
      access_level: 1,
      editTarget: null
    };
  },
  computed: {
    ...mapState({
      profile: state => state.auth.profile
    }),
    activeLocal: {
      get() {
        return this.active;
      },
      set(val) {
        if (!val) {
          this.$emit("close-popup");
        }
        this.createView();
      }
    }
  },
  methods: {
    getLabelForAccessLevel(level) {
      const levelId = parseInt(level, 10);
      if (levelId === 4) {
        return this.$t("SharePopup.AccessLevels.Owner");
      } else {
        return this.access_levels.find(l => l.id === levelId).label;
      }
    },
    createView() {
      this.view = "new";
      this.editTarget = null;
    },
    editView(share) {
      this.view = "edit";
      this.editTarget = share;
    },
    onSave() {
      if (this.view === "edit") {
        this.$emit("edit", {
          user_id: this.editTarget.id,
          access_level: this.access_level
        });
        this.createView();
      } else {
        this.$emit("create", {
          email: this.email,
          access_level: this.access_level
        });
      }
    },
    onRemove(share) {
      this.$emit("remove", share.id);
    }
  }
};
</script>
