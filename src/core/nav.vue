<template>
  <el-menu
    :default-active.sync="activeLink"
    :mode="mode"
    @select="goto"
    :collapse="isCollapse"
    :unique-opened="true"
    background-color="transparent"
    class="main-navigation-menu"
    :class="{'nav-collapsed':isCollapse}"
  >
    <div class="el-menu-item-group__title" style="padding-top: 4px;">
      <span>{{ $t("menu.menu") }}</span>
    </div>
    <el-menu-item index="/dashboard">
      <span class="icon icon-ic_home"></span>
      <span slot="title">{{ $t("menu.dashboard") }}</span>
    </el-menu-item>
    <el-submenu index="procurement" popper-class="main-navigation-submenu">
      <template slot="title">
        <i class="mdi mdi-clipboard-text"></i>
        <span>Procurement</span>
      </template>
      <el-menu-item index="/procurement/po">
        <i class="mdi mdi- mdi-basket-fill"></i>
        <span slot="title">PO</span>
      </el-menu-item>
      <el-menu-item index="/procurement/penyedia">
        <i class="mdi mdi-account"></i>
        <span slot="title">Penyedia</span>
      </el-menu-item>
      <el-menu-item index="/procurement/ba-emergency">
        <i class="mdi mdi-alert-circle"></i>
        <span slot="title">BA Emergency</span>
      </el-menu-item>
      <el-menu-item index="/procurement/monitoring-bapp">
        <i class="mdi mdi-newspaper"></i>
        <span slot="title">Monitoring BAPP</span>
      </el-menu-item>
      <el-menu-item index="/procurement/tagihan">
        <i class="mdi mdi-currency-usd"></i>
        <span slot="title">Tagihan</span>
      </el-menu-item>
      <el-menu-item index="/procurement/email">
        <i class="mdi mdi-email"></i>
        <span slot="title">Mail</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/user" v-if="inRole('superadmin','manajemen')">
      <span class="icon icon-ic_contact"></span>
      <span slot="title">User</span>
    </el-menu-item>
    <el-submenu index="manajemen" popper-class="main-navigation-submenu" v-if="inRole('superadmin','manajemen')">
      <template slot="title">
        <i class="mdi mdi-clipboard"></i>
        <span>Manajemen</span>
      </template>
      <el-menu-item index="/manajemen/akun">
        <i class="mdi mdi-format-list-bulleted"></i>
        <span slot="title">Akun Pengguna</span>
      </el-menu-item>
      <el-menu-item index="/manajemen/rule">
        <i class="mdi mdi-format-list-bulleted"></i>
        <span slot="title">Role User</span>
      </el-menu-item>
      <el-menu-item index="/manajemen/jenis_pengadaan">
        <i class="mdi mdi-format-list-bulleted"></i>
        <span slot="title">Jenis Pengadaan</span>
      </el-menu-item>
      <el-menu-item index="/manajemen/bidang">
        <i class="mdi mdi-format-list-bulleted"></i>
        <span slot="title">Bidang</span>
      </el-menu-item>
      <el-menu-item index="/manajemen/sub_bidang">
        <i class="mdi mdi-format-list-bulleted"></i>
        <span slot="title">Sub Bidang</span>
      </el-menu-item>
      <el-menu-item index="/manajemen/jenis_anggaran">
        <i class="mdi mdi-format-list-bulleted"></i>
        <span slot="title">Jenis Anggaran</span>
      </el-menu-item>
      <el-menu-item index="/manajemen/status_pengadaan">
        <i class="mdi mdi-format-list-bulleted"></i>
        <span slot="title">Status Pengadaan</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>


<script>
import { detect } from "detect-browser";
import config from "../config";
import store from "@/store";
const browser = detect();

export default {
  name: "Nav",
  props: ["mode", "isCollapse"],
  data() {
    return {
      isIe: true,
      isEdge: true,
      activeLink: null,
      config: config,
      allowedRole: store.getters.allowedRole
    };
  },
  methods: {
    goto(index, indexPath) {
      if (index.charAt(0) === "/") {
        this.$router.push(index);
        this.$emit("push-page", { page: index });
      } else {
        window.open(index, "_blank");
      }
    },
    setLink(path) {
      this.activeLink = path;
    },
    inRole(val, val2) {
      if(this.allowedRole.replace(/\s/g, '').includes(val) || this.allowedRole.replace(/\s/g, '').includes(val2)) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    if (browser.name !== "ie") this.isIe = false;
    if (browser.name !== "edge") this.isEdge = false;

    this.setLink(this.$router.currentRoute.path);
    this.$router.afterEach((to, from) => {
      this.setLink(this.$router.currentRoute.path);
      //console.log('afterEach', to, from)
    });
    //console.log('this.$router.currentRoute.path', this.$router.currentRoute.path)
  },
  mounted() {
    this.inRole()
    //console.log('nav component mounted')
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables";

.el-menu {
  border: none;
}
.el-menu::before,
.el-menu::after {
  display: none;
}
.el-submenu,
.el-menu-item {
  .mdi {
    vertical-align: middle;
    margin-right: 5px;
    display: inline-block;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }
}
</style>

<style lang="scss">
@import "../assets/scss/_variables";

.main-navigation-menu {
  transition: width 0.5s;

  &:not(.el-menu--collapse) {
    .el-submenu__title,
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      background-color: transparent !important;
    }

    &:not(.el-menu--horizontal) {
      .el-menu-item,
      .el-submenu {
        position: relative;

        &::before {
          content: "";
          display: block;
          width: 0px;
          height: 1px;
          position: absolute;
          bottom: 10px;
          left: 30px;
          background: $text-color;
          z-index: 1;
          opacity: 0;
          transition: all 0.7s cubic-bezier(0.55, 0, 0.1, 1);
        }
        &:hover {
          &::before {
            width: 100px;
            opacity: 1;
            //left: 50px;
            transform: translate(20px, 0);
          }
        }

        &.is-active {
          &::before {
            background: $text-color-accent;
          }
        }
      }
    }

    .el-submenu.is-opened {
      //background: /#edf1f6 !important;
      //background: rgba(223, 228, 234, 0.38) !important;
      position: relative;

      &::after {
        content: "";
        display: block;
        width: 2px;
        position: absolute;
        top: 40px;
        bottom: 10px;
        left: 31px;
        background: $text-color;
        z-index: 1;
      }

      &::before {
        display: none;
      }

      .el-menu-item,
      .el-submenu {
        &::before,
        &::after {
          display: none;
        }
      }
    }

    .el-menu-item-group__title {
      padding: 15px 0 0px 20px;
      color: transparentize($text-color, 0.65);
    }
  }

  .el-submenu__title,
  .el-menu-item:not(.is-active) {
    color: $text-color;

    i {
      color: $text-color;
    }
  }

  &.el-menu--collapse {
    .el-menu-item-group__title {
      padding: 15px 0 0px 0px;
      width: 100%;
      text-align: center;
    }

    .el-submenu__title:hover,
    .el-menu-item:hover {
      background-color: rgba(0, 0, 0, 0.05) !important;
    }
  }

  &.el-menu--horizontal {
    white-space: nowrap;
    /*width: fit-content;
		width: max-content;*/
    overflow: hidden;
    display: table;

    & > * {
      float: inherit !important;
    }
  }

  &.nav-collapsed {
    .el-menu-item,
    .el-submenu__title {
      & > span {
        display: none;
      }
    }
  }
}

.main-navigation-submenu {
  .el-menu {
    background: #fff !important;

    .el-menu-item:not(.is-active) {
      color: $text-color;
    }
    .el-menu-item:hover {
      background-color: transparentize($background-color, 0.3) !important;
    }
  }
}
</style>
