<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';

const props = defineProps<{
    Title?: string;
    Description?: string;
}>();
</script>

<template>
    <div class="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
        <AuthenticationCardLogo />
        <Card class="mx-auto mt-6 w-full max-w-sm">
            <CardHeader>
                <CardTitle class="text-xl"> {{ props.Title }} </CardTitle>
                <CardDescription> {{ props.Description }} </CardDescription>
            </CardHeader>
            <CardContent>
                <slot />
            </CardContent>
        </Card>
    </div>
</template>
