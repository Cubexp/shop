<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/img/logo.jpg" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏 菜单区 -->
                 <!-- 不加冒号 就是字符 -->
                <el-menu
                    :unique-opened="true"
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    :router="true"
                    :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id" >
                        <template slot="title">
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template> 
                        
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" 
                        :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu> 
                </el-menu>
                
            </el-aside>
            <!-- 右侧内容主体 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                //左侧菜单数据
                menuList: [],
                iconsObj: {
                    '125': 'iconfont icon-user',
                    '103': 'iconfont icon-tijikongjian',
                    '101': 'iconfont icon-shangpin',
                    '102': 'iconfont icon-danju-tianchong',
                    '145': 'iconfont icon-changyongtubiao_yunyingshitu'
                },
                //是否折叠
                isCollapse: false,
                //被激活的链接地址
                activePath: ''
            }
        },
        created() {
            this.getMenuList();
            this.activePath = window.sessionStorage.getItem('activePath')
        },
        methods: {
            logout() {
                window.sessionStorage.clear();
                this.$router.push('/login');
            },
            //获取
            async getMenuList() {
               const {data:res} = await this.$http.get('menus');
               console.log(res);

               if(res.meta.status !== 200) return this.$message.error(res.msg);

               this.menuList = res.data;
            },
            //点击按钮，展开和收缩菜单栏
            toggleCollapse() {
                this.isCollapse = !this.isCollapse;
            }, 
            //保存链接的激活状态
            saveNavState(activePath) {
                window.sessionStorage.setItem('activePath', activePath)
                this.activePath = activePath;
            }
        },
        
    }
</script>

<style lang="less" scoped>
    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        font-size: 20px;
        align-items: center;
        color: #eee;
        > div img {
            width: 50px;
            height: 50px;
            border-radius: 10px;
        }
        > div {
            display: flex;
            align-items: center;
            span {
                margin-left: 15px;
            }
        }
    }
    .el-aside {
        background-color: #333744;
        .el-menu {
            border-right: none;
        }
    }
    .el-main {
        background-color: #eaedf1;
    }
    .home-container {
        height: 100%;
    }
    .iconfont {
        margin-right: 10px;
    }

    .toggle-button {
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>