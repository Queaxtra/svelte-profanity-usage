<script lang="ts">
    import check from "$lib/api";

    let text = "";
    let jsonResponse = {};
    let loading = false;
    let result = false;

    async function checkProfanity() {
        loading = true;
        const response = await check(text);
        jsonResponse = response;
        loading = false;
        result = jsonResponse.flaggedFor.length > 0;
    }
</script>

<header class="flex flex-col justify-center items-center mt-16 px-4">
    <h1 class="text-2xl sm:text-4xl font-bold mb-2">Svelte Profanity Usage</h1>
    <h2 class="text-sm sm:text-base text-center mb-4">Check if your text contains any profanity!</h2>
    <form on:submit|preventDefault={checkProfanity} class="flex flex-col items-center space-y-2">
        <input bind:value={text} type="text" class="border-2 border-[#ba7264] p-2 w-full max-w-md md:w-96 lg:w-96 bg-transparent rounded-lg focus:outline-none text-[#ba7264] placeholder-[#ba7264] text-sm" placeholder="Enter a text">
        {#if !text}
        <button disabled class="bg-[#ba7264]/20 text-white px-6 py-2 rounded-lg focus:outline-none w-full max-w-md">
            <i class="ri-search-line"></i> Check
        </button>
        {:else}
        <button type="submit" class="bg-[#ba7264] text-white px-6 py-2 rounded-lg focus:outline-none w-full max-w-md" disabled={loading}>
            {#if loading}
                <i class="ri-loop-left-line"></i> Loading...
            {:else}
                <i class="ri-search-line"></i> Check
            {/if}
        </button>
        {/if}
    </form>
</header>

{#if !loading && result}
    <div class="flex flex-col justify-center items-center mt-20 px-4">
        <h1 class="text-xl sm:text-2xl font-bold mb-2">Results</h1>
        <h2 class="text-sm sm:text-base text-red-500 mb-4"><i class="ri-error-warning-line"></i> Sorry but your text contains a profanity.</h2>
        <div class="flex flex-col items-center space-y-2 w-full max-w-md">
            <div class="w-full bg-[#f6ecea] rounded-lg border-2 border-[#f0dcd8] p-4">
                <h1 class="text-[#ba7264] mb-2 text-sm md:text-base lg:text-base">Text: {text}</h1>
                <h1 class="text-[#ba7264] text-sm md:text-base lg:text-base">Profanity: <span class="text-red-500 underline">{jsonResponse.flaggedFor || ''}</span></h1>
            </div>
        </div>
    </div>
{/if}
