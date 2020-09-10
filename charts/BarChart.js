import { Bar, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
    extends: Bar,
    props: ['options'],
    mixins: [reactiveProp],
    mounted() {
        console.log(this.chartData, this.options);
        this.renderChart(this.chartData, this.options);
    }
}
