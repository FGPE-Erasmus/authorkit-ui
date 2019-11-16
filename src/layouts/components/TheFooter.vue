<template>
  <footer class="the-footer flex-wrap justify-between small" :class="classes">
    <span>
      &copy; {{ new Date().getFullYear() }}
      <a href="http://fgpe.usz.edu.pl/" target="_blank" rel="nofollow">
        Framework for Gamified Programming Education
      </a>
      . All rights Reserved
    </span>
  </footer>
</template>

<script>
export default {
  name: "the-footer",
  props: {
    classes: {
      type: String
    }
  }
};
</script>
