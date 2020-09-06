<template>
  <file-pond
    name="imageUpload"
    ref="imageUpload"
    class-name="fgpe-pond"
    :label-idle="$t('ImageUpload.Hint')"
    allow-multiple="false"
    max-files="1"
    maxFileSize="500KB"
    :labelMaxFileSizeExceeded="
      $t('validation.maxFileSize', { filesize: '500KB' })
    "
    :labelMaxFileSize="$t('Form.File.MaxFileSizeLabel', { filesize: '500KB' })"
    accepted-file-types="image/jpeg, image/png, image/gif, image/svg+xml"
    :server="server"
    :files="image"
    @init="handleFilePondInit"
    @updatefiles="updateImage()"
  />
</template>

<script>
export default {
  name: "fgpe-image-upload",
  props: {
    value: String
  },
  data() {
    return {
      server: {
        process: null,
        load: (source, load, error, progress, abort) => {
          load(this.dataURItoBlob(this.value));
          // Should expose an abort method so the request can be cancelled
          return {
            abort: () => {
              // User tapped cancel, abort our ongoing actions here
              abort();
            }
          };
        }
      },
      image: []
    };
  },
  watch: {
    value(val) {
      if (val) {
        if (typeof val === "string") {
          this.fromDataUri(val);
        }
      }
    }
  },
  mounted() {
    if (this.value) {
      if (typeof this.value === "string") {
        this.fromDataUri(this.value);
      }
    }
  },
  methods: {
    handleFilePondInit() {},

    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(",")[1]);

      // separate out the mime component
      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // create the blob
      return new Blob([ab], { type: mimeString });
    },

    updateImage() {
      const files = this.$refs.imageUpload.getFiles();
      if (files.length) {
        if (files[0].file instanceof File) {
          this.readImage(files[0].file);
        }
      } else {
        this.$emit("input", null);
      }
    },

    readImage(image) {
      const reader = new FileReader();
      reader.onload = () => {
        this.$emit("input", reader.result);
      };
      reader.readAsDataURL(image);
    },

    fromDataUri(dataUri) {
      var mimeString = dataUri
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];

      let filename;
      switch (mimeString) {
        case "image/jpeg":
          filename = "server.jpg";
          break;
        case "image/png":
          filename = "server.png";
          break;
        case "image/gif":
          filename = "server.gif";
          break;
        case "image/svg+xml":
        default:
          filename = "server.svg";
          break;
      }
      this.image = [
        {
          source: filename,
          options: {
            type: "local"
          }
        }
      ];
    }
  }
};
</script>
