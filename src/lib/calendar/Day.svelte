<script>
    import { getContext, setContext } from "svelte";
    import key from "./key";

    const name = [
        "mandag",
        "tirsdag",
        "onsdag",
        "torsdag",
        "fredag",
        "lørdag",
        "søndag",
    ];

    const { day, weekday, nextDay } = getContext(key);
    nextDay();

</script>

<div class="">
    <p>{name[weekday]}</p>
    <slot />
</div>
