<template lang="html">
    <div class="table-repsonsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tableData" :key="item.id">
                    <td style="width: 70%">{{ item.title }}</td>
                    <td>{{ item.dateCreate }}</td>
                    <td class="text-center">
                        <button
                            v-if="item.tag === 'sale'"
                            class="btn  btn-success"
                        >
                            {{ item.tag }}
                        </button>
                        <button v-else class="btn  btn-warning">
                            {{ item.tag }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'TableInvoices',
    data() {
        return {
            tableData: [
                {
                    key: '1',
                    title:
                        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
                    dateCreate: '20-1-2020',
                    tag: 'sale'
                },
                {
                    key: '2',
                    title:
                        'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur',
                    dateCreate: '21-1-2020',
                    tag: 'new'
                },
                {
                    key: '3',
                    title: ' Et harum quidem rerum',
                    dateCreate: '21-1-2020',
                    tag: 'new'
                },
                {
                    key: '4',
                    title:
                        'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
                    dateCreate: '21-1-2020',
                    tag: 'sale'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
