registerIndicator(
"ac",
"Accelerator Oscillator(v1.0)",
function (context) {
		var dataInput = getDataInput(context, 0)
		var dataUp = getDataOutput(context, "up")
		var dataDown = getDataOutput(context, "down")
		var dataFSMA = getDataOutput(context, "fastSMA")
		var dataSSMA = getDataOutput(context, "slowSMA")
		var dataOutputMain = getDataOutput(context, "main")
		var dataOutputSignal = getDataOutput(context, "signal")

		var fSMA = 5
		var sSMA = 34
		var sgnlSMA = 5

		var calculatedLength = getCalculatedLength(context)
		var i = calculatedLength

		if (i == 0) {
			dataFSMA[0] = dataInput[0]
			dataSSMA[0] = dataInput[0]
			dataOutputMain[0] = 0
			i++
		} else if (i == 1) {
		} else {
			i--
		}

		sma(dataInput, dataFSMA, calculatedLength, fSMA)
		sma(dataInput, dataSSMA, calculatedLength, sSMA)

		while (i < dataInput.length) {
			dataOutputMain[i] = dataFSMA[i] - dataSSMA[i]
			i++
		}

		sma(dataOutputMain, dataOutputSignal, calculatedLength, sgnlSMA)

		i = calculatedLength

		if (i == 0) {
			i++
		} else if (i == 1) {
		} else {
			i--
		}

		var prev, curr

		while (i < dataInput.length) {
			prev = dataOutputMain[i - 1] - dataOutputSignal[i - 1]
			curr = dataOutputMain[i] - dataOutputSignal[i]

			if (prev <= curr) {
				dataUp[i] = curr
				dataDown[i] = 0
			} else {
				dataUp[i] = 0
				dataDown[i] = curr
			}

			i++
		}
	},
[], [{
	name: "HL2",
	index: 0
}], [{
	name: "up",
	visible: true,
	renderType: "Histogram",
	color: "#6CBA81"
}, {
	name: "down",
	visible: true,
	renderType: "Histogram",
	color: "#ECAE93"
}, {
	name: "fastSMA",
	visible: false,
	renderType: null,
	color: null
}, {
	name: "slowSMA",
	visible: false,
	renderType: null,
	color: null
}, {
	name: "main",
	visible: false,
	renderType: null,
	color: null
}, {
	name: "signal",
	visible: false,
	renderType: null,
	color: null
}],
"SEPARATE_WINDOW")
