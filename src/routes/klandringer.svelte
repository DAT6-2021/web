<script>
    import Grid from "gridjs-svelte";

    import klandringer from "$lib/klandringer";
    import { html } from "gridjs";

    const total = klandringer
        .map(
            ({ aldrigsket, anti, klander, med, klandret, mod, konklusion }) => {
                if (aldrigsket) {
                    return 4 * 5 * (klandret || []).length;
                } else if (anti) {
                    return 5 * (konklusion || []).length;
                } else if (med > mod) {
                    return 5 * (klandret || []).length;
                } else if (med < mod) {
                    return 5 * (klander || []).length;
                } else if (med !== undefined && med === mod) {
                    return (
                        5 * (klander || []).length + 5 * (klandret || []).length
                    );
                } else {
                    return 0;
                }
            }
        )
        .reduce((acc, cur) => acc + cur, 0);

    const DEFAULT = {
        vundet: 0,
        tabt: 0,
        anti: 0,
    };

    const personer = klandringer.reduce(
        (acc, { klander, klandret, konklusion }) => {
            acc = (klander || []).reduce(
                (a, v) => ({ ...a, [v]: { ...DEFAULT } }),
                acc
            );
            acc = (klandret || []).reduce(
                (a, v) => ({ ...a, [v]: { ...DEFAULT } }),
                acc
            );
            acc = (konklusion || []).reduce(
                (a, v) => ({ ...a, [v]: { ...DEFAULT } }),
                acc
            );
            return acc;
        },
        {}
    );
    klandringer.forEach(
        ({ klander, klandret, konklusion, aldrigsket, anti, med, mod }) => {
            if (aldrigsket) {
                (klandret || []).forEach((k) => (personer[k].tabt += 4));
            } else if (anti) {
                (konklusion || []).forEach((k) => (personer[k].anti += 1));
            } else if (med > mod) {
                (klander || []).forEach((k) => (personer[k].vundet += 1));
                (klandret || []).forEach((k) => (personer[k].tabt += 1));
            } else if (mod < med) {
                (klander || []).forEach((k) => (personer[k].tabt += 1));
                (klandret || []).forEach((k) => (personer[k].vundet += 1));
            } else if (med !== undefined && med === mod) {
                (klander || []).forEach((k) => (personer[k].vundet += 1));
                (klandret || []).forEach((k) => (personer[k].vundet += 1));
                (klander || []).forEach((k) => (personer[k].tabt += 1));
                (klandret || []).forEach((k) => (personer[k].tabt += 1));
            }
        }
    );

    Object.entries(personer).forEach(([k, { tabt, anti }]) => {
        personer[k].skylder = tabt * 5 + anti * 5;
    });

    let data = klandringer.map((k) => ({
        klander: k.klander.join(", "),
        klandret: k.klandret.join(", "),
        beskrivelse: k.aldrigsket ? null : k.beskrivelse,
        konklusion: k.anti
            ? k.konklusion.join(", ")
            : k.med < k.mod
            ? "I"
            : k.mod < k.med
            ? "O"
            : k.med === k.mod
            ? "𝜙"
            : "",
        med: k.med,
        mod: k.mod,
        aldrigsket: k.aldrigsket ? "aldrigsket" : "",
        anti: k.anti ? "anti" : "",
    }));
</script>

<div class="mx-auto flex space-x-8 p-8">
    <div class="shadow p-8 rounded">
        <p class="text-xl font-bold">Total</p>
        <p>
            <span>{total.toLocaleString()}</span>
            <span class="text-sm font-thin">DKK</span>
        </p>
    </div>
    <div class="shadow p-8 rounded">
        <p class="text-xl font-bold">Total</p>
        <p>
            <span>{(total / 90).toFixed(2).toLocaleString()}</span>
            <span class="text-sm font-thin">GD</span>
        </p>
    </div>
</div>

<div class="mx-auto container p-8">
    <Grid
        {data}
        columns={[
            {
                id: "klander",
                name: "Klander",
                formatter: (cell, row) =>
                    html(
                        `${row.cells[7].data ? "¬" : ""}{${cell}}<sup>${
                            row.cells[4].data || ""
                        }</sup>`
                    ),
            },
            {
                id: "klandret",
                name: "Klandret",
                formatter: (cell, row) =>
                    html(`{${cell}}<sup>${row.cells[5].data || ""}</sup>`),
            },
            {
                id: "beskrivelse",
                name: "Beskrivelse",
                formatter: (cell, row) =>
                    !row.cells[6].data
                        ? cell
                        : html(
                              `<span class="font-bold line-through">ALDRIGSKET</span>`
                          ),
            },
            {
                id: "konklusion",
                name: "Konklusion",
                formatter: (cell, row) =>
                    row.cells[7].data
                        ? `{${cell}}`
                        : !row.cells[6].data
                        ? cell
                        : html(
                              `<span class="font-bold line-through">ALDRIGSKET</span>`
                          ),
            },
            { id: "med", name: "Med", hidden: true },
            { id: "mod", name: "Mod", hidden: true },
            { id: "aldrigsket", name: "Aldrigsket", hidden: true },
            { id: "anti", name: "Anti", hidden: true },
        ]}
        sort={true}
        pagination={true}
        search={{
            enabled: true,
            ignoreHiddenColumns: false,
        }}
    />
</div>

<div class="mx-auto container p-8">
    <Grid
        columns={["Navn", "Tabt", "Vundet", "Anti", "Skylder"]}
        data={Object.entries(personer).map(
            ([navn, { tabt, vundet, anti, skylder }]) => [
                navn,
                tabt,
                vundet,
                anti,
                skylder,
            ]
        )}
        sort={true}
        pagination={true}
        search={{
            enabled: true,
            ignoreHiddenColumns: false,
        }}
    />
</div>
