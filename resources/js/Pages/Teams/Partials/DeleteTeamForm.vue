<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import ActionSection from '@/Components/ActionSection.vue';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/Components/ui/dialog';

const props = defineProps({
    team: Object,
});

const confirmingTeamDeletion = ref(false);
const form = useForm({});

const confirmTeamDeletion = () => {
    confirmingTeamDeletion.value = true;
};

const deleteTeam = () => {
    form.delete(route('teams.destroy', props.team), {
        errorBag: 'deleteTeam',
    });
};
</script>

<template>
    <ActionSection>
        <template #title>
            Delete Team
        </template>

        <template #description>
            Permanently delete this team.
        </template>

        <template #content>
            <div class="max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
                Once a team is deleted, all of its resources and data will be permanently deleted. Before deleting this team, please download any data or information regarding this team that you wish to retain.
            </div>

            <div class="mt-5">
                <Button variant="destructive" @click="confirmTeamDeletion">
                    Delete Team
                </Button>
            </div>

            <!-- Delete Team Confirmation Modal -->
            <Dialog :open="confirmingTeamDeletion" @update:open="(val) => { if (!val) confirmingTeamDeletion = false }">
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Team</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this team? Once a team is deleted, all of its resources and data will be permanently deleted.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button variant="outline" @click="confirmingTeamDeletion = false">
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing"
                            @click="deleteTeam"
                        >
                            Delete Team
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </template>
    </ActionSection>
</template>
