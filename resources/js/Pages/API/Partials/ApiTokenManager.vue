<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';
import ActionSection from '@/Components/ActionSection.vue';
import { Checkbox } from '@/Components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/Components/ui/dialog';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import SectionBorder from '@/Components/SectionBorder.vue';
import { Input } from '@/Components/ui/input';
import type { ApiToken } from '@/types';

const props = defineProps<{
    tokens: ApiToken[];
    availablePermissions: string[];
    defaultPermissions: string[];
}>();

const createApiTokenForm = useForm({
    name: '',
    permissions: props.defaultPermissions as string[],
});

const updateApiTokenForm = useForm({
    permissions: [] as string[],
});

const deleteApiTokenForm = useForm({});

const displayingToken = ref(false);
const managingPermissionsFor: Ref<ApiToken | null> = ref(null);
const apiTokenBeingDeleted: Ref<ApiToken | null> = ref(null);

const createApiToken = () => {
    createApiTokenForm.post(route('api-tokens.store'), {
        preserveScroll: true,
        onSuccess: () => {
            displayingToken.value = true;
            createApiTokenForm.reset();
            toast.success('API token created successfully.');
        },
    });
};

const manageApiTokenPermissions = (token: ApiToken) => {
    updateApiTokenForm.permissions = token.abilities;
    managingPermissionsFor.value = token;
};

const updateApiToken = () => {
    updateApiTokenForm.put(route('api-tokens.update', managingPermissionsFor.value), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            managingPermissionsFor.value = null;
            toast.success('API token permissions updated successfully.');
        },
    });
};

const confirmApiTokenDeletion = (token: ApiToken) => {
    apiTokenBeingDeleted.value = token;
};

const deleteApiToken = () => {
    deleteApiTokenForm.delete(route('api-tokens.destroy', apiTokenBeingDeleted.value), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            apiTokenBeingDeleted.value = null;
            toast.success('API token deleted successfully.');
        },
    });
};
</script>

<template>
    <div>
        <!-- Generate API Token -->
        <FormSection @submitted="createApiToken">
            <template #title> Create API Token </template>

            <template #description> API tokens allow third-party services to authenticate with our application on your behalf. </template>

            <template #form>
                <!-- Token Name -->
                <div class="col-span-6 sm:col-span-4">
                    <Label for="name">Name</Label>
                    <Input id="name" v-model="createApiTokenForm.name" type="text" class="mt-1 block w-full" autofocus />
                    <InputError :message="createApiTokenForm.errors.name" class="mt-2" />
                </div>

                <!-- Token Permissions -->
                <div v-if="availablePermissions.length > 0" class="col-span-6">
                    <Label for="permissions">Permissions</Label>

                    <div class="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div v-for="permission in availablePermissions" :key="permission">
                            <label class="flex items-center">
                                <Checkbox v-model:checked="createApiTokenForm.permissions" :value="permission" />
                                <span class="ms-2 text-sm text-zinc-600 dark:text-zinc-400">{{ permission }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </template>

            <template #actions>
                <Button :class="{ 'opacity-25': createApiTokenForm.processing }" :disabled="createApiTokenForm.processing"> Create </Button>
            </template>
        </FormSection>

        <div v-if="tokens.length > 0">
            <SectionBorder />

            <!-- Manage API Tokens -->
            <div class="mt-10 sm:mt-0">
                <ActionSection>
                    <template #title> Manage API Tokens </template>

                    <template #description> You may delete any of your existing tokens if they are no longer needed. </template>

                    <!-- API Token List -->
                    <template #content>
                        <div class="space-y-6">
                            <div v-for="token in tokens" :key="token.id" class="flex items-center justify-between">
                                <div class="break-all dark:text-white">
                                    {{ token.name }}
                                </div>

                                <div class="ms-2 flex items-center">
                                    <div v-if="token.last_used_ago" class="text-sm text-zinc-400">Last used {{ token.last_used_ago }}</div>

                                    <button
                                        v-if="availablePermissions.length > 0"
                                        class="ms-6 cursor-pointer text-sm text-zinc-400 underline"
                                        @click="manageApiTokenPermissions(token)"
                                    >
                                        Permissions
                                    </button>

                                    <button class="ms-6 cursor-pointer text-sm text-red-500" @click="confirmApiTokenDeletion(token)">Delete</button>
                                </div>
                            </div>
                        </div>
                    </template>
                </ActionSection>
            </div>
        </div>

        <!-- Token Value Modal -->
        <Dialog
            :open="displayingToken"
            @update:open="
                (val) => {
                    if (!val) displayingToken = false;
                }
            "
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>API Token</DialogTitle>
                    <DialogDescription> Please copy your new API token. For your security, it won't be shown again. </DialogDescription>
                </DialogHeader>

                <div
                    v-if="$page.props.jetstream.flash.token"
                    class="rounded bg-zinc-100 px-4 py-2 font-mono text-sm break-all text-zinc-500 dark:bg-zinc-900"
                >
                    {{ $page.props.jetstream.flash.token }}
                </div>

                <DialogFooter>
                    <Button variant="outline" @click="displayingToken = false"> Close </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <!-- API Token Permissions Modal -->
        <Dialog
            :open="managingPermissionsFor != null"
            @update:open="
                (val) => {
                    if (!val) managingPermissionsFor = null;
                }
            "
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>API Token Permissions</DialogTitle>
                </DialogHeader>

                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div v-for="permission in availablePermissions" :key="permission">
                        <label class="flex items-center">
                            <Checkbox v-model:checked="updateApiTokenForm.permissions" :value="permission" />
                            <span class="ms-2 text-sm text-zinc-600 dark:text-zinc-400">{{ permission }}</span>
                        </label>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" @click="managingPermissionsFor = null"> Cancel </Button>
                    <Button
                        :class="{ 'opacity-25': updateApiTokenForm.processing }"
                        :disabled="updateApiTokenForm.processing"
                        @click="updateApiToken"
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <!-- Delete Token Confirmation Modal -->
        <Dialog
            :open="apiTokenBeingDeleted != null"
            @update:open="
                (val) => {
                    if (!val) apiTokenBeingDeleted = null;
                }
            "
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete API Token</DialogTitle>
                    <DialogDescription> Are you sure you would like to delete this API token? </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button variant="outline" @click="apiTokenBeingDeleted = null"> Cancel </Button>
                    <Button
                        variant="destructive"
                        :class="{ 'opacity-25': deleteApiTokenForm.processing }"
                        :disabled="deleteApiTokenForm.processing"
                        @click="deleteApiToken"
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
