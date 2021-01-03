<template>
  <container>
    <Header />
    <section class="grid">
      <main class="grid__main">
        <nuxt />
      </main>
      <aside class="grid__aside">
        aside
      </aside>
    </section>
    <Search />
  </container>
</template>

<script>
import Container from "~/components/TheContainer"
import Header from "~/components/TheHeader"
import Search from "~/components/TheSearch"
export default {
  name: "LayoutDefault",
  components: {
    Container,
    Header,
    Search
  }
}
</script>

<style lang="scss">
@import '~assets/css/main';
</style>
