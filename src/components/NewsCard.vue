<template>

    <div class="card fancy-border">

        <!-- Header -->
        <header class="card-header">
            <slot name="header"></slot>
        </header>

        <!-- Body -->
        <div class="card-body">
            <slot name="body"></slot>
        </div>

        <!-- Footer -->
        <footer class="card-footer">
            <slot name="footer"></slot>
        </footer>
        
    </div>

</template>

<script setup>


</script>