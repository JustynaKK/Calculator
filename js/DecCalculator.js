import {Calculator} from "./Calculator";

class DecCalculator extends Calculator {
    constructor(settings) {
        super(settings);
        console.log(this.getName());
    }

    changeNumber(root) {
        let activeElement = root.find('.active');
        activeElement.attr('contenteditable', 'true');
        activeElement.focus();
        $('.tooltip').show().css({top: '-115px', background: 'lightslategrey', color: 'black'});;
        $('.tooltip').children().first().text('Click to sum!');
        this.$calculatorDOMElement.find("#decPlus").on('click', () => {
                this.checkNumber();
                this.updateResult();
        });
    }

    checkNumber() {
        super.checkNumber();
        this.$calculatorDOMElement.find('.active').each(function (index, el) {
            if ($(el).text() > 9 || $(el).text() < 0 || isNaN(($(el).text()))) {
                $('.tooltip').children().first().text('Please enter the number between 0 and 9.');
                $('.tooltip').css({top: '-160px', backgroundColor: '#DB0B3C', color: 'white'});
                $(el).text(0);
            }
        });
    }

    add(numberX, numberY) {
        let result = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = numberX.length - 1; i >= 0; i--) {
            let tempResult = numberX[i] + numberY[i] + result[i];
            if (tempResult > 9) {
                result[i] = tempResult % 10;
                result[i - 1] = Math.floor(tempResult / 10);
            } else {
                result[i] = tempResult;
            }
        }
        return result;
    }

    updateResult() {
        let root = this.$calculatorDOMElement;
        let $resultNumber = root.children(".group-number").children(".result-bit");
        for (let i = this.resultNumberArray.length - 1, j = 0; i >= 0; i--, j++) {
            parseInt($resultNumber.eq(j).find(".active").text(this.resultNumberArray[i]));
        }
    }
}


export {DecCalculator};

