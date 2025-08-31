<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <div :class="cn('flex w-full max-w-sm flex-col gap-6', props.class)">
        <Card>
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription> Enter your email below to login to your account </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div class="flex flex-col gap-6">
                        <div class="grid gap-3">
                            <Label for="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div class="grid gap-3">
                            <div class="flex items-center">
                                <Label for="password">Password</Label>
                                <a href="#" class="ml-auto inline-block text-sm underline-offset-4 hover:underline"> Forgot your password? </a>
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                        <div class="flex flex-col gap-3">
                            <Button type="submit" class="w-full"> Login </Button>
                            <Button variant="outline" class="w-full"> Login with Google </Button>
                        </div>
                    </div>
                    <div class="mt-4 text-center text-sm">
                        Don't have an account?
                        <a href="#" class="underline underline-offset-4"> Sign up </a>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
