<div class="flex flex-col font-overpass border-1 rounded-2xl max-w-md m-4 p-4 sm:p-6 sm:mx-8 sm:my-6 md:p-6 md:mx-16 md:my-12 lg:flex-none lg:p-6 lg:mr-5 lg:my-12 ">
        <span class="font-bold text-neutral-5 text-xl sm:text-3xl md:text-3xl lg:text-3xl border-b-2">{name}</span>
        <div class="flex flex-col mt-6 space-y-6">
            {#each contacts as contact, i}
                <PhoneNumber {...contact } />
            {/each}
            {#if email}
                <div class="flex items-start space-x-3 sm:space-x-6 md:space-x-6 lg:space-x-6">
                    <div class="flex flex-shrink-0 items-center justify-center rounded-full bg-primary-7 p-2 sm:p-3 md:p-3 lg:p-3">
                        <img class="w-4 h-4 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-6 lg:h-6" src="ic_email.svg" alt="email" />
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-neutral-3 text-xs sm:text-lg md:text-lg lg:text-base leading-none">Email</span>
                        <span class="font-semibold text-primary-7 text-sm sm:text-2xl md:text-2xl lg:text-xl">{email}</span>
                    </div>
                </div>
            {/if}
            {#if address}
                <div class="flex items-start space-x-3 sm:space-x-6 md:space-x-6 lg:space-x-6">
                    <div class="flex flex-shrink-0 items-center justify-center rounded-full bg-primary-7 p-2 sm:p-3 md:p-3 lg:p-3">
                        <img class="w-4 h-4 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-6 lg:h-6" src="ic_address.svg" alt="address" />
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-neutral-3 text-xs sm:text-lg md:text-lg lg:text-base leading-none">Alamat</span>
                        <span class="font-semibold text-primary-7 text-sm sm:text-2xl md:text-2xl lg:text-xl">{address}</span>
                    </div>
                </div>
            {/if}
        </div>
</div>


<script>
    import PhoneNumber from "./PhoneNumber.svelte";

    export let name;
    export let contacts;
    export let email;
    export let address;
</script>