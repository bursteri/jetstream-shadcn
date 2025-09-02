<script setup lang="ts">
import { ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import ActionSection from '@/Components/ActionSection.vue';
import ConnectedAccount from '@/Components/ConnectedAccount.vue';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/Components/ui/dialog';
import InputError from '@/Components/InputError.vue';
import { Input } from '@/Components/ui/input';
import type { SocialstreamProvider, ConnectedAccount as ConnectedAccountType } from '@/types/inertia';

const accountId = ref<number | null>(null);
const confirmingRemoveAccount = ref(false);
const passwordInput = ref<HTMLInputElement | null>(null);

const page = usePage();

const form = useForm({
    password: '',
});

const getAccountForProvider = (provider: SocialstreamProvider): ConnectedAccountType | undefined => {
    return (page.props as any).socialstream?.connectedAccounts.filter((account: ConnectedAccountType) => account.provider === provider.id).shift();
};

const setProfilePhoto = (id: number) => {
    form.put(route('user-profile-photo.set', { id }), {
        preserveScroll: true,
    });
};

const confirmRemoveAccount = (id: number) => {
    accountId.value = id;

    confirmingRemoveAccount.value = true;

    setTimeout(() => passwordInput.value?.focus(), 250);
};

const removeAccount = () => {
    form.delete(route('connected-accounts.destroy', { id: accountId.value }), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value?.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    confirmingRemoveAccount.value = false;

    form.reset();
};

const handleConnect = (provider: SocialstreamProvider) => {
    window.location.href = (window as any).route('oauth.redirect', { provider: provider.id });
};
</script>

<template>
    <ActionSection>
        <template #title> Connected Accounts </template>

        <template #description> Connect your social media accounts to enable Sign In with OAuth. </template>

        <template #content>
            <div class="space-y-6">
                <div v-for="provider in (page.props as any).socialstream?.providers" :key="provider.id">
                    <ConnectedAccount :provider="provider" :created-at="getAccountForProvider(provider)?.created_at">
                        <template #action>
                            <template v-if="getAccountForProvider(provider)">
                                <div class="flex items-center space-x-6">
                                    <button
                                        v-if="(page.props as any).jetstream?.managesProfilePhotos && getAccountForProvider(provider)?.avatar_path"
                                        @click="setProfilePhoto(getAccountForProvider(provider)!.id)"
                                        class="ms-6 cursor-pointer text-sm text-zinc-500 hover:text-zinc-700 focus:outline-none"
                                    >
                                        Use Avatar as Profile Photo
                                    </button>

                                    <Button
                                        variant="destructive"
                                        @click="confirmRemoveAccount(getAccountForProvider(provider)!.id)"
                                        v-if="(page.props as any).socialstream?.connectedAccounts.length > 1 || (page.props as any).socialstream?.hasPassword"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </template>

                            <template v-else>
                                <Button variant="outline" @click="() => handleConnect(provider)"> Connect </Button>
                            </template>
                        </template>
                    </ConnectedAccount>
                </div>
            </div>

            <!-- Confirmation Modal -->
            <Dialog
                :open="confirmingRemoveAccount"
                @update:open="
                    (val) => {
                        if (!val) closeModal();
                    }
                "
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to remove this account?</DialogTitle>
                        <DialogDescription> Please enter your password to confirm you would like to remove this account. </DialogDescription>
                    </DialogHeader>

                    <div>
                        <Input
                            ref="passwordInput"
                            v-model="form.password"
                            type="password"
                            class="mt-1 block w-3/4"
                            placeholder="Password"
                            autocomplete="current-password"
                            @keyup.enter="removeAccount"
                        />

                        <InputError :message="form.errors.password" class="mt-2" />
                    </div>

                    <DialogFooter>
                        <Button variant="outline" @click="closeModal"> Cancel </Button>
                        <Button class="ml-2" @click="removeAccount" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                            Remove Account
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </template>
    </ActionSection>
</template>
