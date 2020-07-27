<template>
  <div id="app">
    <aside class="sidebar">
      <router-view />
    </aside>
    <ContentComponent />
  </div>
</template>

<script>
import SidebarFormRegistration from "@/components/SidebarFormRegistration";
import SidebarFormLogin from "@/components/SidebarFormLogin";
import ContentComponent from "@/components/ContentComponent";
export default {
  name: "App",
  components: {
    SidebarFormRegistration,
    SidebarFormLogin,
    ContentComponent,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #817f88;
  font-weight: normal;
  display: flex;
  align-items: center;
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fcfcfc;
  min-width: 478px;
  height: fit-content;
  border-right: 1px solid #dde2e5;
  padding: 30px 0;
}

@media screen and (max-width: 767px) {
  .sidebar {
    width: 100%;
  }
}
</style>
