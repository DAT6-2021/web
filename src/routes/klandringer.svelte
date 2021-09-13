<script>
    import klandringer from "$lib/klandringer";
    import { ActivityIcon, ThumbsDownIcon, ThumbsUpIcon } from "svelte-feather-icons";
    const total = klandringer.map(k => {
        if (k.anti) {
            return k.konklusion.length * 5;
        } else if (k.med > k.mod) {
            return 5;
        } else if (k.med < k.mod) {
            return 5;
        } else if (k.med === k.mod) {
            return 10;
        } else {
            return 0;
        }
    }).reduce((acc, cur) => acc + cur, 0);
</script>

<div class="mx-auto flex space-x-8 p-8">
    <div class="shadow p-8 rounded">
        <p class="text-xl font-bold">Total</p>
        <p>
            <span>{total}</span>
            <span class="text-sm font-thin">DKK</span>
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
            {#each klandringer as { klander, klandret, beskrivelse, konklusion, anti, med, mod }}
                <tr>
                    <td>
                        <span>{anti ? "¬" : ""}</span><ul>
                            {#each klander as klander}
                                <li>{klander}</li>
                            {/each}
                        </ul><sup>{med || ""}</sup>
                    </td>
                    <td>
                        <ul>
                            {#each klandret as klandret}
                                <li>{klandret}</li>
                            {/each}
                        </ul><sup>{mod || ""}</sup>
                    </td>
                    <td class="text-medium whitespace-normal">{beskrivelse}</td>
                    <td>
                        {#if konklusion}
                        <ul>
                            {#each konklusion || [] as konklusion}
                                <li>{konklusion}</li>
                            {/each}
                        </ul>
                        {:else}
                            {med > mod ? "O" : med < mod ? "I" : "𝜙"}
                        {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    table {
        @apply min-w-full divide-y divide-gray-200;
    }
    table ul {
        @apply inline-flex flex-wrap;
    }
    table ul::before {
        content: "{";
    }
    table ul::after {
        content: "}";
    }
    table ul li:not(:last-child)::after {
        content: ", ";
        white-space: pre;
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
    table tbody tr td sup {
    }
</style>