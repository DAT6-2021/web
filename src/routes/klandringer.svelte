<script>
    import klandringer from "$lib/klandringer";
    import { ThumbsDownIcon, ThumbsUpIcon } from "svelte-feather-icons";
</script>

<div class="mx-auto flex space-x-8 p-8">
    <div class="shadow p-8 rounded">
        <p class="text-xl font-bold">Total</p>
        <p>
            <span>{Math.floor(300 / 120)}</span>
            <span class="text-sm font-thin">gammel dansk</span>
        </p>
    </div>
    <div class="shadow p-8 rounded">
        <p class="text-xl font-bold">Vundet flest</p>
        <p>Jacob R</p>
    </div>
    <div class="shadow p-8 rounded">
        <p class="text-xl font-bold">Tabt flest</p>
        <p>Jacob R</p>
    </div>
    <div class="shadow p-8 rounded">
        <p />
    </div>
</div>

<div class="mx-auto container p-8">
    <table class="shadow rounded">
        <thead>
            <tr>
                <th scope="col">Klander</th>
                <th scope="col">Klandret</th>
                <th scope="col">Beskrivelse</th>
                <th scope="col">Konklusion</th>
            </tr>
        </thead>
        <tbody>
            {#each klandringer as { klander, klandret, beskrivelse, konklusion, anti }}
                <tr>
                    <td>{`{${klander.join(", ")}}`}</td>
                    <td>{`{${klandret.join(", ")}}`}</td>
                    <td class="text-medium">{beskrivelse}</td>
                    {#if anti}
                    <td>{`{${konklusion.join(", ")}}`}</td>
                    {:else}
                        <td class="flex">
                            <span class="flex items-center">{konklusion[0]}<ThumbsUpIcon class="h-4" /></span>
                            <span class="flex items-center ml-4">{konklusion[1]}<ThumbsDownIcon class="h-4"/></span>
                        </td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    table {
        @apply min-w-full divide-y divide-gray-200;
    }

    table thead {
        @apply bg-gray-50 uppercase text-sm font-medium text-gray-500 text-left;
    }

    table thead tr th {
        @apply px-6 py-3;
    }

    table tbody {
        @apply bg-white divide-y divide-gray-200;
    }

    table tbody tr td {
        @apply px-6 py-4;
    }
</style>