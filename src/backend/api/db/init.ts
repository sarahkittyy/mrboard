import mongoose from 'mongoose';

mongoose.connect('mongodb://0.0.0.0/sushicat', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});