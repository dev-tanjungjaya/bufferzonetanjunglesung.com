<script context="module">
    export function preload({ params, query }) {
       return this.fetch(`penginapan.json`)
       .then(r => r.json())
       .then(({ rooms, roomCategories, roomFacilities, publicFacilities, promotions }) => {
          return { rooms, roomCategories, roomFacilities, publicFacilities, promotions };
       });
    }
</script>

<script>
    import RoomItem from "../../components/listing/RoomItem.svelte";
    import Grid from "../../components/listing/Grid.svelte";
    import SelectFilter from "../../components/filter/Select.svelte";
    import PriceFilter from "../../components/filter/PriceRange.svelte";
    import Navigation from "../../components/listing/Navigation.svelte";
    import { onMount, tick } from 'svelte';
    import { stores } from '@sapper/app';
    import { scrollHistory } from '../../stores';
    const { page } = stores();

    onMount(async () => {
        await tick();
        window.scrollTo(0, $scrollHistory[$page.path] || 0);
        initialized = true;
    })

    const title = "Cari Penginapan di Buffer Zone KEK Tanjung Lesung";
    const description = "Cari Penginapan di Buffer Zone KEK Tanjung Lesung";
    const url = "https://www.bufferzonetanjunglesung.com/penginapan/";

    export let rooms;
    export let roomCategories;
    export let roomFacilities;
    export let publicFacilities;
    export let promotions;

    let filters = [];
    let initialized = false;
    let scrollY;

    $: if(initialized) $scrollHistory = { ...$scrollHistory, [$page.path]: scrollY};
    $: filters = [
        {
            label: "Kategori",
            component: SelectFilter,
            props: {
                values: roomCategories,
                label: "Kategori",
                itemField: "categories",
                type: "rooms",
                unique: true
            }
        },
        {
            label: "Harga",
            component: PriceFilter,
            props: {
                type: "rooms",
                label: "Harga",
                maxPrice: Math.max(...rooms.map(room => 
                    Math.max(...room.prices.map(price => price.value))
                ))
            }
        },
        {
            label: "Fasilitas publik",
            component: SelectFilter,
            props: {
                values: publicFacilities,
                label: "Fasilitas publik",
                type: "rooms",
                itemField: "publicFacilities"
            }
        },
        {
            label: "Fasilitas kamar",
            component: SelectFilter,
            props: {
                values: roomFacilities,
                label: "Fasilitas kamar",
                type: "rooms",
                itemField: "roomFacilities"
            }
        },
        ...promotions.length ? [{
            label: "Promosi",
            component: SelectFilter,
            props: {
                values: promotions,
                label: "Promosi",
                type: "rooms",
                itemField: "promotions",
                itemFieldFn: (promotions) => promotions.map(p => p.promotion)
            }
        }] : []
    ];

</script>

<svelte:head>
   <title>{title}</title>
   <link rel="canonical" href={url} />
   <meta name="description" content={description} />
   <meta property="og:title" content={title} />
   <meta property="og:type" content="website" />
   <meta property="og:description" content={description} />
   <meta property="og:image" content="images/landing-1.webp" />
   <meta property="og:url" content={url} />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content={title}>
   <meta name="twitter:description" content={description}>
   <meta name="twitter:image" content="images/landing-1.webp">
</svelte:head>

<svelte:window bind:scrollY={scrollY} />

<div class="flex flex-col px-2 xs:px-4 md:px-6 lg:px-16 pt-6 lg:pt-10 min-h-screen">
    <Grid
        items={rooms}
        itemComponent={RoomItem}
        filters={filters}
        current="penginapan"
    />
    <p class="mt-8 p-5 border-1 border-neutral-1 rounded-2xl font-overpass text-xs sm:text-sm text-neutral-4">
        Kamu ingin berkunjung ke Hidden Treasure of Tanjung Lesung tapi tidak tahu harus menginap dimana? Bosan 
        dengan penginapan yang begitu-begitu saja? Ingin merasakan sensasi baru menginap di pedesaan?  Ayo jalani 
        keseruan tinggal bersama warga lokal dengan memesan homestay dan penginapan lainnya di Hidden Treasure of 
        Tanjung Lesung. Kamu dapat menginap di homestay yang tersedia sembari menjalani berbagai budaya dan 
        aktivitas bersama para warga desa. Tidak hanya tempat beristirahat, kamu juga akan mendapatkan banyak 
        pengalaman seru dengan tinggal bersama warga. Sangat menarik bukan? Warga desa juga sudah tidak sabar 
        untuk menjalani keseruan denganmu. Ayo pesan homestay dan penginapan Hidden Treasure of Tanjung Lesung 
        sekarang juga!
    </p>
</div>