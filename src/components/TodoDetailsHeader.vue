<template>
    <div class="flex flex-wrap w-full">
        <div :class="`flex w-full border-b ${borderColor}`">
            <div class="w-1/3 text-left">
                <a @click="$router.go(-1)" class="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                </a>
            </div>
            <div class="w-1/3 text-center text-sm font-bold uppercase">{{todo.title}}</div>
            <div class="w-1/3"></div>
        </div>                    

        <div class="w-full">
            <div class="text-center py-4">
                {{priorityLabel}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'borderColor',
        'priorityLabel',
        'todo'
    ]
}
</script>