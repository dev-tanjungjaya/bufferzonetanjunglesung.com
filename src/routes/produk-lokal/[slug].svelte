<script context="module">
   export async function preload({ params: { slug }, query }) {
      const res = await this.fetch(`produk-lokal/${slug}.json`);
      if (res.status === 200) {
         const data = await res.json();
         return { data };
      }
   }
</script>

<script>
   import Decorator from "../../components/Decorator.svelte";
   import Contact from "../../components/Item/Contact.svelte";
   import Header from "../../components/Item/Header.svelte";
   import Prices from "../../components/Item/Prices.svelte";
   import Link from "../../components/Item/Link.svelte";
   import Promotions from "../../components/Item/Promotions.svelte";
   import { onMount } from "svelte";

   let DOMPurify = null;
   let PhotosComponent;

   onMount(async () => {
      DOMPurify = await import('dompurify');

      const photosModule = await import("../../components/Item/Photos.svelte");
      PhotosComponent = photosModule.default;
   })

   export let data;
   let title;
   let description;
   let image;
   let url;

   $: title = `${data.name} - ${data.categories.join(", ")} - Produk Lokal Buffer Zone KEK Tanjung Lesung`;
   $: description = data.description.replace(/(<([^>]+)>)/g, "").replace(/(\r\n|\n|\r)/gm, "");
   $: image = data.photos.length ? 'https://www.bufferzonetanjunglesung.com/' + data.photos[0].photoURI : '';
   $: url = "https://www.bufferzonetanjunglesung.com/produk-lokal/" + data.slug;
</script>

<svelte:head>
   <title>{title}</title>
   <link rel="canonical" href={url} />
   <meta name="description" content={description} />
   <meta property="og:title" content={title} />
   <meta property="og:type" content="website" />
   <meta property="og:description" content={description} />
   <meta property="og:image" content={image} />
   <meta property="og:url" content={url} />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content={title}>
   <meta name="twitter:description" content={description}>
   <meta name="twitter:image" content={image}>
</svelte:head>

<div class="px-4 sm:px-8 md:px-16 py-6 sm:py-12 flex flex-col">
   <Header
      typeURL="produk-lokal"
      type="PRODUK LOKAL"
      title={data.name}
      categories={data.categories}
   />
 
   <div 
      class={`${PhotosComponent ? '' : 'skeleton-box'} rounded-2xl w-full h-full`} 
      style="max-height: 360px; min-height: 250px"
   >
   <svelte:component this={PhotosComponent} photos={data.photos} />
   </div>

   <div 
      class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-10 xl:space-x-32 lg:justify-between mt-10 
      sm:mt-20 max-w-7xl"
   >
      <div class="flex flex-col flex-grow">
         {#if data.promotions && data.promotions.length}
            <Promotions promotions={data.promotions} />
         {/if}
         {#if DOMPurify}
            <p class="font-open-sans text-neutral-5 text-lg sm:text-xl prose">
               {@html DOMPurify.sanitize(data.description)}
            </p>
         {/if}
         {#if data.notes && DOMPurify}
            <Decorator />
            <div class="flex flex-col font-overpass">
               <span class="font-bold text-neutral-5 text-2xl sm:text-3xl mb-6 sm:mb-6">Catatan</span>
               <p class="font-open-sans font-normal text-neutral-5 text-lg sm:text-xl prose">
                  {@html DOMPurify.sanitize(data.notes)}
               </p>
            </div>
         {/if}
      </div>
      <div class="flex flex-col flex-shrink-0 self-start max-w-full space-y-6" style="width: 375px">
         <Prices prices={data.prices} />
         <!-- {#if data.ecommerce}
            <Link url={data.ecommerce} icon="ic_ecommerce.svg" label="Tautan toko daring" />
         {/if} -->
         {#if data.contact && data.contact.length}
         <Contact contacts={data.contact} name="Silahkan hubungi admin untuk membeli atau informasi lebih lanjut" />
         {/if}
      </div>
   </div>
</div>