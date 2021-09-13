<script>
    import "../styles/tailwind.css";
    import { page } from "$app/stores";
</script>

<header class="flex flex-shrink-0 h-28 shadow">
    <nav class="container mx-auto px-8 text-xl font-bold flex space-x-1">
        <a href="/" class:active={/^\/$/.test($page.path)}>Hjem</a>
        <a href="/klandringer" class:active={/^\/klandringer/.test($page.path)}>Klandringer</a>
        <a href="/links" class:active={/^\/links/.test($page.path)}>Links</a>
    </nav>
</header>
<main class="flex flex-col flex-1"><slot /></main>

<style>
    nav a {
        @apply flex justify-center items-center px-4 hover:bg-indigo-700 hover:text-white;
    }
    nav a.active {
        @apply bg-indigo-700 text-white;
    }
</style>