<script>
    import key from "./key";
    import {getContext} from "svelte";
    const {
        month,
        day,
        nextMonth,
    } = getContext(key);
    nextMonth();
</script>

<div class="grid grid-cols-7">
    <slot/>
</div>