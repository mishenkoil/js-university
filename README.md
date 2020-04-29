<h1># js-university</h1>
Solved tasks from ITMO university course paradigms-2020


<h1 id="homework-6">Домашнее задание 6. Функциональные выражения на JavaScript</h1>
<ol><li>
            Разработайте функции <code>cnst</code>, <code>variable</code>,
            <code>add</code>, <code>subtract</code>, <code>multiply</code>,
            <code>divide</code>, <code>negate</code>
            для вычисления выражений с одной переменной.
        </li><li>
            Функции должны позволять производить вычисления вида:
            <pre>let expr = subtract(
    multiply(
        cnst(2),
        variable("x")
    ),
    cnst(3)
);
println(expr(5));
            </pre>
            При вычислении такого выражения вместо каждой переменной подставляется значение,
            переданное в качестве параметра функции <code>expr</code> (на данном этапе
            имена переменных игнорируются). Таким образом, результатом вычисления
            приведенного примера должно стать число 7.
        </li><li>
            Тестовая программа должна вычислять выражение
            <code>x<sup>2</sup>−2x+1</code>, для <code>x</code> от 0 до 10.
        </li><li><b>Сложный вариант.</b> Требуется написать функцию
            <code>parse</code>, осуществляющую разбор выражений,
            записанных в
            <a href="http://ru.wikipedia.org/wiki/%D0%9E%D0%B1%D1%80%D0%B0%D1%82%D0%BD%D0%B0%D1%8F_%D0%BF%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%D0%B0%D1%8F_%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8C">обратной польской записи</a>.
            Например, результатом
            <pre>parse("x x 2 - * x * 1 +")(5)</pre>
            должно быть число <code>76</code>.
        </li><li>
            При выполнение задания следует обратить внимание на:
            <ul><li>
                    Применение функций высшего порядка.
                </li><li>
                    Выделение общего кода для бинарных операций.
                </li></ul></li></ol>

<h1>Модификация</h1>
<ul>
<li><em>Базовая</em>

<ul>
<li>Код должен находиться в файле <code>functionalExpression.js</code>.</li>
<li><s>Исходный код тестов</s>

<ul>
<li>Запускать c аргументом <code>hard</code> или <code>easy</code>;</li>
</ul></li>
</ul></li>

<li><em>PieAvgMed</em>. Дополнительно реализовать поддержку:

<ul>
<li>переменных: <code>y</code>, <code>z</code>;</li>
<li>констант:

<ul>
<li><code>pi</code> – π;</li>
<li><code>e</code> – основание натурального логарифма;</li>
</ul></li>
<li>операций:

<ul>
<li><code>avg5</code> – арифметическое среднее пяти аргументов, <code>1 2 3 4 5 avg5</code> равно 7.5;</li>
<li><code>med3</code> – медиана трех аргументов, <code>1 2 -10 med3</code> равно 1.</li>
</ul></li>
<li><s>Исходный код тестов</s>

<ul>
<li>Запускать c аргументом <code>hard</code> или <code>easy</code></li>
</ul></li>
</ul></li>
</ul>                
                
                
                
<h1 id="homework-7">Домашнее задание 7. Объектные выражения на JavaScript</h1>
<ol><li>
            Разработайте классы <code>Const</code>, <code>Variable</code>,
            <code>Add</code>, <code>Subtract</code>, <code>Multiply</code>,
            <code>Divide</code>, <code>Negate</code>
            для представления выражений с одной переменной.
            <ol><li>
                    Пример описания выражения <code>2x-3</code>:
                    <pre>let expr = new Subtract(
    new Multiply(
        new Const(2),
        new Variable("x")
    ),
    new Const(3)
);
                    </pre></li><li>
                    Метод <code>evaluate(x)</code> должен производить вычисления вида:
                    При вычислении такого выражения вместо каждой переменной подставляется значение <code>x</code>,
                    переданное в качестве параметра функции <code>evaluate</code> (на данном этапе
                    имена переменных игнорируются). Таким образом, результатом вычисления
                    приведенного примера должно стать число 7.
                </li><li>
                    Метод <code>toString()</code> должен выдавать
                    запись выражения в
                    <a href="http://ru.wikipedia.org/wiki/%D0%9E%D0%B1%D1%80%D0%B0%D1%82%D0%BD%D0%B0%D1%8F_%D0%BF%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%D0%B0%D1%8F_%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8C">обратной польской записи</a>.
                    Например, <code>expr.toString()</code> должен выдавать
                    <code>2 x * 3 -</code>.
                </li></ol></li><li><b>Сложный вариант.</b><div>
            Метод <code>diff("x")</code> должен возвращать выражение,
            представляющее производную исходного выражения
            по переменной <code>x</code>.
            Например, <code>expr.diff("x")</code> должен возвращать
            выражение, эквивалентное <code>new Const(2)</code>
            (выражения
                <code>new Subtract(new Const(2), new Const(0))</code> и
                <pre>new Subtract(
    new Add(
        new Multiply(new Const(0), new Variable("x")),
        new Multiply(new Const(2), new Const(1))
    )
    new Const(0)
)
                 </pre>
                 так же будут считаться правильным ответом).
            </div><p>
                Функция <code>parse</code> должна выдавать разобранное
                объектное выражение.
            </p></li><li>
            При выполнение задания следует обратить внимание на:
            <ul><li>
                    Применение инкапсуляции.
                </li><li>
                    Выделение общего кода для операций.
                </li></ul></li></ol>
                
<h1>Модификация</h1>                
<ul>
<li><em>Базовая</em>

<ul>
<li>Код должен находиться в файле <code>objectExpression.js</code>.</li>
<li><s>Исходный код тестов</s>

<ul>
<li>Запускать c аргументом <code>easy</code>, <code>hard</code> или <code>bonus</code>.</li>
</ul></li>
</ul></li>

<li><em>PowLog</em>. Дополнительно реализовать поддержку:

<ul>
<li>бинарных операций:

<ul>
<li><code>Power</code> (<code>pow</code>) – возведение в степень, <code>2 3 pow</code> равно 8;</li>
<li><code>Log</code> (<code>log</code>) – логарифм абсолютного значения аргумента
по абсолютному значению основания <code>-2 -8 log</code> равно 3;</li>
</ul></li>
<li><s>Исходный код тестов</s></li>
</ul></li>
</ul>
