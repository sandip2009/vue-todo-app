<template>
    <div>
        <Menu />
        <div class="container mx-auto">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Menu from './components/Menu.vue';
export default {
    components: { Menu }
};
</script>