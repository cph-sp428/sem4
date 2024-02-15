import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(Parameterized.class)
class NumeralConverterTest {

    @Test()
    void convertToRomanI(){
        //arrange
        NumeralConverter nc = new NumeralConverter();
        int i = 1;
        String expected = "I";

        //act
        String result = nc.convertToRoman(i);

        //assert
        assertEquals(expected, result);
    }

    @Test
    void convertToRomanII(){
        //arrange
        NumeralConverter nc = new NumeralConverter();
        int i = 2;
        String expected = "II";

        //act
        String result = nc.convertToRoman(i);

        //assert
        assertEquals(expected, result);
    }

    @Test
    void convertToRomanIII(){
        //arrange
        NumeralConverter nc = new NumeralConverter();
        int i = 3;
        String expected = "III";

        //act
        String result = nc.convertToRoman(i);

        //assert
        assertEquals(expected, result);
    }

    @Test
    void convertToRomanIV(){
        //arrange
        NumeralConverter nc = new NumeralConverter();
        int i = 4;
        String expected = "IV";

        //act
        String result = nc.convertToRoman(i);

        //assert
        assertEquals(expected, result);
    }

    @Test
    void convertToRomanV(){
        //arrange
        NumeralConverter nc = new NumeralConverter();
        int i = 5;
        String expected = "V";

        //act
        String result = nc.convertToRoman(i);

        //assert
        assertEquals(expected, result);
    }

    @Test
    void convertToRomanVI(){
        //arrange
        NumeralConverter nc = new NumeralConverter();
        int i = 6;
        String expected = "VI";

        //act
        String result = nc.convertToRoman(i);

        //assert
        assertEquals(expected, result);
    }

    @Test
    void convertToRomanVII(){
        //arrange
        NumeralConverter nc = new NumeralConverter();
        int i = 7;
        String expected = "VII";

        //act
        String result = nc.convertToRoman(i);

        //assert
        assertEquals(expected, result);
    }

    @Test
    void convertToRomanIX(){
        //arrange
        NumeralConverter nc = new NumeralConverter();
        int i = 9;
        String expected = "IX";

        //act
        String result = nc.convertToRoman(i);

        //assert
        assertEquals(expected, result);
    }

    @Test
    void convertToRomanX(){
        //arrange
        NumeralConverter nc = new NumeralConverter();
        int i = 10;
        String expected = "X";

        //act
        String result = nc.convertToRoman(i);

        //assert
        assertEquals(expected, result);
    }

    @Test()
    void convertToRomanXI(){
        //arrange
        NumeralConverter nc = new NumeralConverter();
        int i = 11;
        String expected = "XI";

        //act
        String result = nc.convertToRoman(i);

        //assert
        assertEquals(expected, result);
    }



    @Test
    void convertToRomanEmpty(){
        //arrange
        NumeralConverter nc = new NumeralConverter();
        int i = 0;
        String expected = "";

        //act
        String result = nc.convertToRoman(i);

        //assert
        assertEquals(expected, result);
    }

    @Test
    void convertToRomanNegative(){
        //arrange
        NumeralConverter nc = new NumeralConverter();
        int i = -1;
        String expected = "";

        //act
        String result = nc.convertToRoman(i);

        //assert
        assertEquals(expected, result);
    }
}