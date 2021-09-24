<script>
import { navigating } from "$app/stores";

    import klandringer from "$lib/klandringer";
    const total = klandringer.map(({aldrigsket, anti, klander, med, klandret, mod, konklusion}) => {
        if (aldrigsket) {
            return 4 * 5 * (klandret || []).length;
        } else if (anti) {
            return 5 * (konklusion || []).length;
        } else if (med > mod) {
            return 5 * (klandret || []).length;
        } else if (med < mod) {
            return 5 * (klander || []).length;
        } else if (med !== undefined && med === mod) {
            return 5 * (klander || []).length + 5 * (klandret || []).length;
        } else {
            return 0;
        }
    }).reduce((acc, cur) => acc + cur, 0);

    const DEFAULT = {
        vundet: 0,
        tabt: 0,
        anti: 0,
    };

    const personer = klandringer.reduce((acc, { klander, klandret, konklusion }) => {
        acc = (klander || []).reduce((a, v) => ({ ...a, [v]: {...DEFAULT}}), acc);
        acc = (klandret || []).reduce((a, v) => ({ ...a, [v]: {...DEFAULT}}), acc);
        acc = (konklusion || []).reduce((a, v) => ({ ...a, [v]: {...DEFAULT}}), acc);
        return acc;
    }, {});
    klandringer.forEach(({ klander, klandret, konklusion, aldrigsket, anti, med, mod }) => {
        if (aldrigsket) {
            (klandret || []).forEach(k => personer[k].tabt += 4);
        } else if (anti) {
            (konklusion || []).forEach(k => personer[k].anti += 1);
        } else if (med > mod) {
            (klander || []).forEach(k => personer[k].vundet += 1);
            (klandret || []).forEach(k => personer[k].tabt += 1);
        } else if (mod < med) {
            (klander || []).forEach(k => personer[k].tabt += 1);
            (klandret || []).forEach(k => personer[k].vundet += 1);
        } else if (med !== undefined && med === mod) {
            (klander || []).forEach(k => personer[k].vundet += 1);
            (klandret || []).forEach(k => personer[k].vundet += 1);
            (klander || []).forEach(k => personer[k].tabt += 1);
            (klandret || []).forEach(k => personer[k].tabt += 1);    
        }
    });

    Object.entries(personer).forEach(([k, { tabt, anti }]) => {
        personer[k].skylder = tabt * 5 + anti * 5;
    })
    
</script>

<div class="mx-auto flex space-x-8 p-8">
    <div class="shadow p-8 rounded">
        <p class="text-xl font-bold">Total</p>
        <p>
            <span>{total}</span>
            <span class="text-sm font-thin">DKK</span>
        </p>
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
            {#each klandringer as { klander, klandret, beskrivelse, konklusion, anti, med, mod, aldrigsket }}
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
                    <td class="text-medium whitespace-normal">
                        {#if aldrigsket}
                            <span class="font-bold line-through">REDACTED</span>
                        {:else}
                            {beskrivelse}
                        {/if}
                    </td>
                    <td>
                        {#if konklusion}
                        <ul>
                            {#each konklusion || [] as konklusion}
                                <li>{konklusion}</li>
                            {/each}
                        </ul>
                        {:else if aldrigsket}
                            <span class="font-bold line-through">REDACTED</span>
                        {:else}
                            {med > mod ? "O" : med < mod ? "I" : med === mod && med !== undefined ? "𝜙" : ""}
                        {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<div class="mx-auto container p-8">
    <table class="shadow rounded">
        <thead>
            <tr>
                <th scope="col">Navn</th>
                <th scope="col">Tabt</th>
                <th scope="col">Vundet</th>
                <th scope="col">Anti</th>
                <th scope="col">Skylder</th>
            </tr>
        </thead>
        <tbody>
            {#each Object.entries(personer) as [navn, { tabt, vundet, anti, skylder }]}
            <tr>
                <td>{navn}</td>
                <td>{tabt || 0}</td>
                <td>{vundet || 0}</td>
                <td>{anti || 0}</td>
                <td>{skylder || 0}</td>
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