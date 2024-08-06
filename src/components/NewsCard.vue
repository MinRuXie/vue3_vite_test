<template>

    <div class="card fancy-border">
        <div class="card-body">

            <!-- Header -->
            <header>
                <slot name="header"></slot>
            </header>
            
            <!-- Body -->
            <main>
                <slot name="body"></slot>
            </main>

            <!-- Footer -->
            <footer>
                <slot name="footer"></slot>
            </footer>

        </div>
    </div>


</template>

<script setup>


</script>