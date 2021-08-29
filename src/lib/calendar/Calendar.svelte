<script>
    import Day from "./Day.svelte";
    import Event from "./Event.svelte";
    import Month from "./Month.svelte";

    import { setContext } from "svelte";
    import key from "./key";

    let month = 0;
    let day = 0;
    let weekday = 0;
    const nextDay = () => {
        day += 1;
        weekday += 1;
        weekday %= 7;
    }

    const nextMonth = () => {
        month += 1;
        day = 0;
    } 

    setContext(key, {
        month: 10,
        day: 0,
        weekday: 0,
        nextDay,
        nextMonth,
    });
</script>

<div>
    <Month>
        <Day>
            <Event from="" to="" name="" description="" />
        </Day>
        <Day>
            <Event from="" to="" name="" description="" />
        </Day>
        <Day>
            <Event from="" to="" name="" description="" />
        </Day>
        <Day>
            <Event from="" to="" name="" description="" />
        </Day>
        <Day>
            <Event from="" to="" name="" description="" />
        </Day>
    </Month>
</div>
