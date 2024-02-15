public class NumeralConverter {

    public String convertToRoman(int i) {

        if( i < 1){
            return "";
        }

        if(i == 4){
            return "IV";
        } else if(i == 5){
            return "V";
        }

        String result = "";

        while(i >= 10){
            result += "X";
            i -= 10;
        }

        if(i == 9){
            return "IX";
        }

        if(i > 5){
            result += "V";
            i -= 5;
        }
        while(i > 0){
            result += "I";
            i--;
        }
        return result;

    }

}
