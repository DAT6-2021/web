<script>
    import Calendar from "$lib/calendar/Calendar.svelte";

    let persons = [
        {
            name: "Jacob Emil Ulvedal Rosborg",
            alias: ["Jacob", "JacobR", "Defman", "Emil", "Jacob Emil"],
            social: [],
            description: "",
            age: 22,
        },
    ];
</script>

<div class="prose mx-auto p-8">
    <h1>Velkommen til Hold 6 Datalogi 2021</h1>
    <p>Vi består af følgende personer....</p>
</div>

<div class="container mx-auto p-8">
    <Calendar />
</div>

<div class="mx-auto container p-8 grid grid-cols-5">
    <!-- {#each persons as { name, alias, social, description }}
        <div class="shadow rounded">
            <img src="" alt="" class="w-full h-72" />
            <div class="p-8">
                <h3 class="text-xl">{name}</h3>
                <p>{description}</p>
            </div>
        </div>
    {/each} -->
</div>
