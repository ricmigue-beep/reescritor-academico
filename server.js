const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const MODEL = 'deepseek-chat';
const MAX_TOKENS = 16000;

// ============ GUÍAS COMPLETAS ============
const PHASE_1_GUIDE = `FASE 1. Revisa el texto para identificar patrones de redacción artificial para lo cual te basarás en # GUÍA COMPLETA PARA IDENTIFICAR TEXTOS GENERADOS POR INTELIGENCIA ARTIFICIAL
GUÍA COMPLETA PARA IDENTIFICAR TEXTOS GENERADOS POR INTELIGENCIA ARTIFICIAL
--------------------------------------------------------------------------------
SECCIÓN A: LOS 8 PATRONES PROFUNDOS (Sobreviven a cualquier registro o tema)
Estos marcadores son los más fiables porque no dependen del tono, el vocabulario ni la temática. Aparecen tanto en textos académicos como ensayísticos, divulgativos o científicos. Si un texto acumula varios de ellos, la probabilidad de que sea IA es muy alta.
A1. Perfección estructural
Qué es: El texto sigue un plan lógico impecable, sin digresiones, sin ideas que se abandonan a medias, sin cambios de opinión bruscos.
Ejemplo: En el corpus académico, cada párrafo seguía el molde tesis-desarrollo-cierre. En los ensayos, cada párrafo tenía una función precisa y encadenaba con el siguiente sin fisuras.
A2. Cierre contundente y autoconclusivo
Qué es: Cada párrafo o el texto entero remata con una frase que encapsula todo lo dicho, sin dejar cabos sueltos ni invitar a una continuación necesaria.
Ejemplos del corpus:
Modo académico: "fenómeno complejo", "situación multifactorial", "enfoque multidimensional y contextualizado".
Modo ensayístico: "ninguna sociedad puede llamarse verdaderamente desarrollada mientras permita que el código postal de una persona determine su destino biológico".
Modo divulgativo: "proteger la vida colectiva es una tarea posible y urgente".
A3. Ausencia de un yo vivido
Qué es: No hay anécdotas personales, recuerdos sensoriales, experiencias profesionales concretas ni referencias a la trayectoria vital del autor.
Ejemplo: En ningún fragmento del corpus aparece una frase como "cuando trabajé en el hospital..." o "en mi experiencia como paciente...". Incluso en los ensayos con voz apasionada, el autor es una abstracción sin biografía.
A4. Exhaustividad controlada
Qué es: Las listas de factores, causas, instrumentos o ejemplos cubren todas las categorías esperables. No falta ninguna, no sobra ninguna, y el orden es lógico y equilibrado.
Ejemplo: En los textos sobre determinantes de la salud, la IA siempre menciona los mismos cuatro: biológicos, conductuales, sanitarios y ambientales (a veces añade "sociales"). En los ensayos, los ejemplos históricos son siempre los canónicos (peste negra, cólera, gripe española).
A5. Cero errores involuntarios
Qué es: No hay erratas, tildes olvidadas, concordancias fallidas, frases mal construidas ni puntuación descuidada. La perfección técnica es absoluta.
Ejemplo: En los 18 fragmentos analizados no apareció una sola errata.
A6. Ausencia de vacilaciones reales
Qué es: Las afirmaciones son seguras. Las dudas que aparecen son solo retóricas (del tipo "podría decirse que...") y nunca afectan al núcleo del argumento. No hay frases como "no estamos seguros de si..." o "este hallazgo fue inesperado".
Ejemplo: En los papers simulados, los resultados se presentan como hechos definitivos. Jamás se menciona una limitación del estudio.
A7. Cohesión perfecta y sobrexplicada
Qué es: Los conceptos se retoman con sinónimos exactos de tesauro. No hay pronombres ambiguos ni elipsis bruscas. Todo está hilado de manera explícita.
Ejemplo: "adherencia farmacológica" → "cumplimiento terapéutico" → "continuidad del cuidado". La cadena es impecable, sin la creatividad irregular de un humano.
A8. No abandona su plan
Qué es: La IA no se desvía de la estructura que ha empezado. No introduce una idea nueva a mitad de párrafo, no cambia de opinión, no se deja llevar por una metáfora hasta olvidar el argumento.
Ejemplo: En el megapárrafo (P13), la IA siguió un guion de nueve módulos sin un solo desorden.
--------------------------------------------------------------------------------
SECCIÓN B: PATRONES DEL MODO ACADÉMICO GENÉRICO
Este es el registro más fácil de identificar. Se caracteriza por textos impersonales, llenos de fórmulas rígidas y abstracciones.
B1. El verbo "permitir" + infinitivo como muletilla
Qué es: El verbo permitir seguido de un infinitivo (analizar, reconocer, evidenciar, comprender, sustentar, identificar, diferenciar, relacionar) aparece de manera obsesiva en lugar de verbos más directos.
Frecuencia en el corpus: 12 apariciones en los textos académicos.
Ejemplos:
"El estudio... permitió analizar la forma en que el paciente asumía su tratamiento"
"La revisión permitió identificar que el control asmático fue una categoría vinculada con múltiples factores"
B2. Enumeraciones triádicas (o cuádruples) abstractas
Qué es: La información se organiza en grupos de tres (o a veces cuatro) elementos, presentados como categorías exhaustivas.
Ejemplos:
"aspectos personales, familiares y sanitarios"
"comprensión del tratamiento, la disciplina y la percepción sobre la gravedad"
"determinantes biológicos, conductuales, sanitarios y ambientales"
B3. Corrección de una "visión simplista" con "no solo... sino"
Qué es: La IA presenta primero una idea que considera limitada o ingenua y luego la corrige con una enumeración de factores más complejos.
Frecuencia en el corpus: Aparece en al menos 6 de los párrafos académicos.
Ejemplos:
"no solo dependía de recibir una receta médica... También intervenían la comprensión, la disciplina..."
"no se limitó a la presencia o ausencia de síntomas, sino que integró aspectos como..."
B4. Etiquetas abstractas de cierre
Qué es: Al final del párrafo, la IA encapsula todo lo dicho en un sustantivo abstracto que funciona como diagnóstico académico.
Ejemplos:
"fenómeno complejo"
"situación multifactorial"
"enfoque multidimensional y contextualizado"
B5. Frases comodín de apertura
Qué es: El párrafo comienza con una fórmula vaga que simula rigor académico sin citar nada concreto.
Ejemplos:
"En la literatura revisada..."
"En los antecedentes revisados..."
"El estudio de la adherencia farmacológica..."
B6. Conectores formales limitados y repetidos
Qué es: La IA usa un repertorio pequeño de conectores cultos que recicla constantemente.
Catálogo detectado: Asimismo (3 veces), Por ello (2 veces), De esta manera, Por esta razón, En ese sentido, Además, Del mismo modo, De igual forma.
B7. Impersonalidad extrema
Qué es: Predominan las pasivas reflejas y las construcciones impersonales. El investigador humano desaparece.
Ejemplos: "se observó que", "se reconoció que", "fue considerado", "se abordó como".
B8. Ausencia total de datos concretos
Qué es: No hay cifras, porcentajes, fechas, lugares, nombres de instituciones ni referencias a estudios reales. Todo es conceptual y abstracto.
B9. Falsa articulación entre párrafos
Qué es: Los párrafos parecen encadenados por conectores, pero en realidad son unidades autoconclusivas intercambiables. Se pueden leer en orden alterado sin perder comprensión.
--------------------------------------------------------------------------------
SECCIÓN C: PATRONES DEL MODO ENSAYÍSTICO-LITERARIO
Este registro es más sofisticado y puede engañar a un lector desprevenido. La IA adopta un tono apasionado, metafórico y profundo.
C1. Dualidades tensas como esqueleto retórico
Qué es: El texto se construye sobre oposiciones binarias cuidadosamente equilibradas que cubren todo el espectro de un debate.
Ejemplo: "entre la libertad individual y el bien colectivo, entre la evidencia científica y la percepción popular, entre los recursos disponibles y las necesidades infinitas".
C2. Metáforas de impacto como piezas colocadas
Qué es: La IA genera metáforas brillantes pero las distribuye estratégicamente (una por párrafo, al final). No se deja arrastrar por ellas.
Ejemplos:
"El dolor colectivo cristalizando en arquitectura institucional"
"La desigualdad enferma con la misma eficacia que un patógeno"
"El código postal de una persona determine su destino biológico"
C3. Cierres diseñados para ser citados (aforísticos)
Qué es: Cada párrafo o el texto entero remata con una frase lapidaria que condensa la tesis con fuerza poética. Busca el subrayado del lector.
Ejemplos:
"Su mayor paradoja es que su éxito borra las huellas de su propio esfuerzo"
"Somos cuerpos frágiles viviendo en proximidad, y esa proximidad es simultáneamente nuestra mayor riqueza y nuestra mayor vulnerabilidad"
C4. Voz profética sin profeta
Qué es: El texto adopta un tono grave, visionario, de manifiesto, pero carece de una trayectoria vital que respalde esa voz autorizada. El autor es una abstracción.
C5. Ejemplos históricos canónicos como mobiliario cultural
Qué es: Los ejemplos que se usan son siempre los más conocidos y predecibles, como extraídos de una enciclopedia general.
Ejemplo: Las tres grandes epidemias (peste negra, cólera, gripe española), la pandemia de COVID-19.
C6. La agenda global como molde de problemas contemporáneos
Qué es: Al enumerar desafíos actuales, la IA reproduce la lista estándar del discurso internacional (obesidad, salud mental, cambio climático, desinformación). No descubre problemas nuevos.
C7. Apelación a "la ciencia" sin cita concreta
Qué es: La IA invoca la autoridad de la ciencia o de "los estudios" sin mencionar un solo autor, revista o dato verificable.
Ejemplo: "verdades elementales que la ciencia ha confirmado una y otra vez con obstinada claridad".
C8. El final "esperanzador pero complejo"
Qué es: La IA evita tanto el optimismo ingenuo como el pesimismo total. Ofrece un cierre que reconoce la dificultad pero apela a la capacidad humana de superarla.
--------------------------------------------------------------------------------
SECCIÓN D: PATRONES DEL MODO DIVULGATIVO-ARGUMENTATIVO
Este registro simula la voz de un manual, un editorial o un artículo de divulgación.
D1. Tono de manual o entrada enciclopédica
Qué es: El texto define, contrasta, ejemplifica y cierra. Es una miniatura perfecta del género "artículo de divulgación general".
D2. Definición inicial clara y directa
Qué es: A diferencia del modo académico (que usa frases comodín) o del ensayístico (que usa metáforas), el modo divulgativo suele arrancar con una definición limpia.
Ejemplo: "La salud pública abarca todas las acciones que una sociedad lleva a cabo para proteger y mejorar la salud de su población".
D3. Ejemplos de catálogo universal
Qué es: Las intervenciones o ejemplos mencionados son los más emblemáticos del discurso global, sin anclaje local.
Ejemplo: "Campañas de vacunación, regulación del tabaco, control de la calidad del aire y el agua".
D4. Cierre equilibrado en lugar de aforístico
Qué es: El texto remata con un balance sensato que reconcilia polos opuestos. No busca el aplauso sino la aprobación serena.
Ejemplo: "la cooperación internacional en salud pública se ha vuelto tan indispensable como la acción local".
D5. Uso de clichés globalizados
Qué es: Frases hechas del discurso internacional que suenan bien pero carecen de originalidad.
Ejemplo: "En un mundo cada vez más interconectado, donde una enfermedad puede cruzar fronteras en cuestión de horas".
D6. Corrección ética de la visión tecnocrática
Qué es: La IA presenta primero una visión limitada (la salud pública como simple ciencia) para luego superarla con una visión ética y ampliada.
--------------------------------------------------------------------------------
SECCIÓN E: PATRONES DEL MODO PAPER CIENTÍFICO
Este es el registro más difícil de desenmascarar porque la IA construye una verosimilitud muy elaborada con autores, revistas, datos y metodología.
E1. Verosimilitud construida con datos inventados pero plausibles
Qué es: La IA genera apellidos de autores creíbles, nombres de revistas reales o verosímiles, cifras de muestra redondas pero no demasiado perfectas, y porcentajes u odds ratios en rangos plausibles.
Ejemplos: 1,847 adultos; 187 pacientes; odds ratios entre 1.8 y 3.4; 66,1% de asma no controlada.
E2. La estructura IMRyD como molde inviolable
Qué es: El paper simulado sigue el orden canónico (Introducción/Objetivo → Método → Resultados → Discusión/Conclusión) sin alterarlo ni omitir ningún paso.
E3. Ausencia de limitaciones del estudio
Qué es: A diferencia de un paper real, el texto generado nunca menciona sesgos, limitaciones metodológicas, problemas de validez externa ni direcciones para futuras investigaciones. Todo se presenta como resultados sólidos.
E4. Andamiaje de credibilidad superficial
Qué es: La IA coloca nombres, fechas, cifras e instrumentos como marcadores de academicidad, pero no desarrolla discusión metodológica profunda, no contrasta con otros estudios ni cita limitaciones.
E5. Porcentajes sin medidas de significancia o excesivamente precisos
Qué es: La IA puede mostrar porcentajes con decimales innecesarios o, al contrario, porcentajes redondos sin intervalos de confianza, p-valores ni tamaños del efecto. En ambos casos, falta el rigor estadístico real.
Ejemplo: 45,99% (decimal excesivo para una muestra de 187) o 41% de incremento (sin p-valor).
E6. Omisión de resultados del análisis multivariado
Qué es: La IA menciona que se realizó "análisis bivariado y multivariado" pero a menudo omite reportar los odds ratios, intervalos de confianza o p-valores. Esta inconsistencia entre método anunciado y resultados es muy delatora.
E7. Detalle peculiar como adorno de verosimilitud
Qué es: La IA inserta un hallazgo inesperado y concreto para simular profundidad, pero no lo desarrolla ni contextualiza.
Ejemplo: "El tipo inconsciente fue la modalidad más frecuente de incumplimiento terapéutico".
E8. Anclaje local integrado pero genérico
Qué es: La IA puede nombrar hospitales, ciudades o países concretos, pero el resto del texto permanece genérico y no depende realmente de ese anclaje. Es un adorno geográfico, no una experiencia vivida.
E9. Diversidad geográfica como máscara global
Qué es: La IA puede simular estudios en Perú, Etiopía o cualquier otro país, adaptando apellidos, idiomas y porcentajes. La verosimilitud geográfica no es garantía de autenticidad.
E10. Conclusión genérica a pesar del anclaje local
Qué es: Incluso con un lugar muy concreto, la conclusión es universal y no extrae implicaciones locales, culturales o sanitarias específicas.
E11. Reciclaje de la misma agenda en todos los registros
Qué es: La conclusión de los papers simulados repite el mensaje de los textos divulgativos y ensayísticos: hay que abordar los determinantes sociales con políticas intersectoriales. La IA tiene una tesis subyacente que reinserta en todos los formatos.
E12. Instrumentos estrella reutilizados
Qué es: La IA tiene un repertorio limitado de instrumentos validados (como el Asthma Control Test) que recicla entre textos.
--------------------------------------------------------------------------------
SECCIÓN F: OTROS PATRONES TRANSVERSALES
F1. Párrafo extenso como falsa unidad
Qué es: La IA puede generar bloques de texto muy largos sin dividirlos en párrafos menores. Esta extensión ininterrumpida, combinada con cohesión perfecta, es un marcador de generación automática.
F2. Saturación de conectores formales
Qué es: La acumulación de conectores lógicos en un mismo texto produce un efecto artificial de sobreestructuración.
F3. Resistencia a la digresión
Qué es: La IA nunca se sale del tema, nunca introduce una anécdota que no venga al caso, nunca hace un chiste involuntario ni una asociación libre.
F4. Variación controlada de la enumeración
Qué es: La IA puede variar el número de elementos en sus listas, pero la estructura enumerativa en sí nunca se abandona.
--------------------------------------------------------------------------------
SECCIÓN G: PROTOCOLO RÁPIDO DE DETECCIÓN
Si sospechas que un texto puede ser generado por IA, hazte estas preguntas:
¿El texto tiene errores? Si es perfecto, sospecha.
¿Aparece el autor como persona concreta? Si no hay anécdotas, experiencias ni biografía, sospecha.
¿Hay datos concretos y verificables? Si todo es abstracto o los datos son sospechosamente plausibles, sospecha.
¿La estructura es demasiado perfecta? Si cada párrafo es autoconclusivo y sigue un molde, sospecha.
¿Abundan los conectores formales y las enumeraciones triádicas? Si es así, sospecha.
¿El texto menciona limitaciones o dudas reales? Si nunca lo hace, sospecha.
¿La conclusión es un cierre redondo que busca aplauso o equilibrio perfecto? Si es así, sospecha. Regla de oro: Cuantos más patrones de esta guía aparezcan simultáneamente, mayor es la probabilidad de que el texto haya sido generado por una inteligencia artificial. Con 3-4 patrones hay sospecha fundada; con 6 o más, la certeza es muy alta.`;
const PHASE_2_GUIDE = `GUÍA PARA HUMANIZAR TEXTOS (EVITAR IA) – VERSIÓN COMPLETA Y CORREGIDA
REGLA DE ORO (LA MÁS IMPORTANTE)
NUNCA inicies un párrafo con un título suelto + punto + otro tema.
❌ “Dragon Ball. En el ámbito internacional Dragon Ball es una franquicia…” ❌ “Evolución de la narrativa. Por otro lado la historia fue evolucionando…” ❌ “Impacto cultural. En cuanto al impacto de la obra…” ❌ “Diabetes mellitus. La diabetes mellitus es una enfermedad crónica…”
Siempre comienza con una oración completa que introduzca el tema de manera natural.
Puntos clave a recordar: ✅ Nunca copies textualmente los ejemplos. Son solo para entender la estructura. ✅ Cada texto debe tener su propio inicio, adaptado al tema y al contexto. ✅ La oración inicial debe ser completa y fluir naturalmente. ✅ No uses títulos sueltos seguidos de punto y otro tema. ✅ Varía la forma de empezar según el texto: a veces con autor, a veces con institución, a veces con definición.
Ejemplo de MAL inicio (título suelto): ❌ "Taza. La taza tiene dos significados..."
Ejemplo de BIEN inicio (oración completa y natural): ✅ "La palabra taza puede tener dos significados diferentes dependiendo del contexto en el que se use."
--------------------------------------------------------------------------------
1. ESTRUCTURA QUE DEBES SEGUIR AL REESCRIBIR
Para estudios o investigaciones:
Contexto (país/institución) + autor + año + tipo de estudio + población + resultados + (conclusión, solo si el texto original la incluye)
Ejemplo: En Perú, Churata (2018) realizó un estudio cuyo objetivo fue determinar los factores asociados a suspensión de cirugías en el Hospital III Yanahuara, Arequipa, siendo un estudio asociativo, observacional y transversal, tomando como muestra un total de 567 trabajadores de salud, y los resultados obtenidos mostraron que el 75% del personal tuvo un resultado superior al promedio y el 25% tuvo un resultado inferior al promedio, llegando a concluir que el personal con mayor conocimiento presentaba menor riesgo de infecciones.
Para definiciones de conceptos:
Concepto + fuente + definición + características + ejemplos
Ejemplo: El maltrato infantil según la OMS se define como los abusos y la desatención de que son objeto los menores de 18 años, el cual incluye todos los tipos de violencia física o psicológica, abuso sexual, desatención, negligencia y explotación comercial o de otro tipo.
Para procedimientos o metodología:
Introducción + paso 1 + paso 2 + paso 3 + paso 4 + paso 5
Ejemplo: Para el procesamiento y análisis de los datos se hará: Solicitud de permiso. Luego procederá la aplicación del instrumento. Posterior a ello se realizará la selección de fichas. Por consiguiente, la tabulación de la información. Después la redacción del primer borrador. Por último, la redacción final de informe.
--------------------------------------------------------------------------------
2. CONECTORES QUE DEBES USAR (son los que usás en tus textos)
Tipo
Conectores
Para empezar
Por su parte, En el ámbito internacional, Según, De acuerdo a, En cuanto a, En relación a, Con respecto a, Por otro lado, Además, Sin embargo, Asimismo, De la misma manera
Para conectar ideas
siendo, el cual/la cual, cuyo objetivo fue, teniendo como resultado, obteniendo como resultados, dando como resultado, esto conlleva a, llegando a concluir, esto permite inferir, esto es corroborado por, por su parte, mientras que, de igual manera, por ello mismo, es por ello que, por ende, por lo tanto, en ese sentido, de esta manera, con la finalidad de, a través de, por medio de, mediante, ya que, dado que, debido a
Para secuencias
Luego, Posterior a ello, Por consiguiente, Después, Por último, En primer lugar, En segundo lugar, Finalmente
Para enumerar
como lo son, entre los cuales tenemos, tales como, así como, i) ii) iii), 1. 2. 3., Primero, Segundo, Tercero
Para cerrar
llegando a concluir, en conclusión, se concluye entonces, por lo tanto, en tal sentido, de esta manera, Todo esto nos da evidencias que
Importante sobre los conectores de cierre: Los conectores de cierre como "llegando a concluir" o "en conclusión" SOLO se usan cuando el texto original del estudio proporciona explícitamente una conclusión. Si el texto original termina en los resultados o no tiene una conclusión clara, no se debe forzar ni inventar un cierre. El párrafo termina con los resultados, de forma natural.
--------------------------------------------------------------------------------
3. LO QUE NUNCA DEBES USAR (marcadores de IA)
Palabras y frases prohibidas:
❌ visión integral ❌ determinantes (como sustantivo suelto) ❌ entornos estructurales ❌ recursos individuales ❌ posibilidades reales de desarrollo ❌ adoptar esta visión ❌ facilita vincular ❌ mejorar sustancialmente ❌ organismos globales ❌ dinámicas globales modernas ❌ sociedades contemporáneas actuales ❌ abordaje (usá “enfoque”) ❌ inherente (usá “propio de”) ❌ coyuntura (usá “situación”) ❌ paradigma (usá “modelo”) ❌ sinergia (usá “colaboración”)
Errores de estilo que delatan IA:
❌ Comas antes de “y” → “las redes sociales, y las condiciones” (mal) ✅ “las redes sociales y las condiciones” (bien) ❌ Citas colgadas al final sin contexto → “(15)” suelto ✅ “esto es apoyado por Pérez (2020)…” ❌ Lenguaje grandilocuente → “transformar las condiciones externas” ✅ “cambiar las condiciones externas” ❌ “etc.” en exceso → no abuses. Usalo solo cuando la lista sea larga y no exhaustiva.
--------------------------------------------------------------------------------
4. LO QUE SÍ DEBES HACER (marcas de humano)
✅ Repetir palabras sin miedo: “los autores”, “siendo”, “resultados”, “el cual”
✅ Usar “junto con” o “junto a”: “los factores biológicos junto con los determinantes digitales”
✅ Usar “siendo” como muletilla: “siendo este un estudio de tipo descriptivo”
✅ Usar “el cual / la cual”: “el cual fue realizado en Bogotá”
✅ Para evitar sonar como un robot, se permite UNA sola torpeza de concordancia verbal (por ejemplo, "los factores influye") en todo el texto. No se deben cometer errores de tipeo ni faltas de ortografía bajo ningún concepto.
✅ Dar datos concretos con porcentajes: “el 78% de los participantes”
✅ Citas dentro del párrafo (no al final): “Según Pérez (2020) esto se debe a que…”
✅ Usar comillas para citas textuales: “un segmento de la población masculina…”
✅ Usar incisos con guiones (–): “–dicen las autoras–”
✅ Usar secuencias temporales: “Luego”, “Posterior a ello”, “Por consiguiente”, “Después”, “Por último”
✅ Usar formatos inconsistentes: a veces coma decimal, a veces punto; a veces guiones, a veces no. La IA es perfecta, el humano no.
✅ No dejes palabras sin tilde y no uses guiones.
--------------------------------------------------------------------------------
5. REGLA DEL 30% PARA EXTENSIÓN
Cuando reescribas un texto, podés aumentar hasta un 30% y reducir hasta un 10 del total de palabras.
Texto original: 1700 palabras → puede quedar entre 1300 y 2210
Texto original: 500 palabras → puede quedar entre 450 y 650
¿Cuándo reducir? Cuando el original es muy redundante o tiene frases vacías.
¿Cuándo aumentar? Cuando el original es muy seco o tecnicista.
--------------------------------------------------------------------------------
6. ERRORES Y TORPEZAS TÍPICAS (que te salen naturalmente)
De concordancia: “los factores influye”, “el cargo es ejercida”, “relacionado al fomento”
De puntuación: “Concluyó, que”, “Es por ello, que”, “El fomento de la salud, consta de”
--------------------------------------------------------------------------------
7. CHECKLIST PARA HUMANIZAR UN TEXTO
[ ] ¿Empieza con una oración completa y no con un título suelto + punto? (SÍ)
[ ] ¿Tiene comas antes de “y”? (NO)
[ ] ¿Tiene citas colgadas al final sin contexto? (NO)
[ ] ¿Usa “siendo” y “el cual” como conectores? (SÍ)
[ ] ¿Repite palabras sin miedo? (SÍ)
[ ] ¿Tiene exactamente UNA torpeza de concordancia (ej. "los factores influye")? (SÍ)
[ ] ¿Tiene errores de tipeo? (NO)
[ ] ¿Incluye porcentajes exactos si hay datos? (SÍ)
[ ] ¿Menciona países o lugares específicos? (SÍ)
[ ] ¿Las oraciones se alargan con comas pero no son perfectas? (SÍ)
[ ] ¿Usa “etc.” con moderación? (SÍ)
[ ] ¿Incluye “de la misma manera” o “por otro lado”? (SÍ)
[ ] ¿Tiene gerundios (llegando, obteniendo, teniendo)? (SÍ)
[ ] ¿Usa “junto con” o “junto a”? (SÍ)
[ ] ¿Usa títulos conceptuales solo cuando define conceptos? (SÍ)
[ ] ¿Usa incisos con guiones (–) si aplica? (SÍ)
[ ] ¿Usa secuencias temporales si aplica? (SÍ)
[ ] ¿Fuerza una conclusión donde no la hay? (NO)
[ ] ¿Usa "llegando a concluir" sin que el texto original tenga conclusión? (NO)
[ ] ¿El texto suena a que lo escribió una persona real y no un robot? (SÍ)
--------------------------------------------------------------------------------
8. PLANTILLA DE INSTRUCCIONES PARA DAR A OTRA PERSONA
Para reescribir y humanizar un texto (evitar IA):
Nunca empieces con un título suelto + punto + otro tema. Siempre con oración completa.
Nunca uses coma antes de “y”.
Repetí palabras sin miedo: “siendo”, “el cual”, “resultados”, “autores”.
Para sonar humano, se permite UNA sola torpeza de concordancia verbal en todo el texto. No se permiten errores de tipeo ni faltas de ortografía.
No uses lenguaje abstracto: evitá “visión integral”, “entornos estructurales”, “determinantes”.
Usá “siendo” y “el cual” como conectores.
Poné porcentajes exactos si los hay.
Mencioná países o lugares específicos.
Las citas van dentro del párrafo, no colgadas al final.
Usá frases largas con comas, pero no perfectas.
Usá “etc.” con moderación, solo cuando la lista sea larga.
Usá “junto con” en lugar de “y” a veces.
Usá gerundios: “llegando”, “obteniendo”, “teniendo”.
No reduzcas el texto del original.
Incluí fechas exactas y nombres de documentos oficiales si los hay.
No uses palabras como “abordaje”, “inherente”, “coyuntura”, “paradigma”, “sinergia”.
No dejes palabras sin tilde y no uses guiones.
Si el texto original no tiene conclusión, no uses “llegando a concluir” ni inventes una.
El texto debe sonar a que lo escribió una persona real, no un robot.
FIN DE LA GUÍA`;
// ========================================

app.use(express.json({ limit: '200kb' }));
app.use(express.static('public'));

app.post('/api/reescribir', async (req, res) => {
  const { text: original } = req.body;
  if (!original || original.length < 80) {
    return res.status(400).json({ error: 'Texto demasiado corto.' });
  }
  if (original.length > 180000) {
    return res.status(400).json({ error: 'Texto demasiado largo.' });
  }

  try {
    // Fase 1
    const phase1Messages = [
      { role: 'system', content: 'Analiza el texto según la guía de detección de IA. Responde solo JSON.' },
      { role: 'user', content: `${PHASE_1_GUIDE}\n\nTEXTO:\n${original}` }
    ];
    const phase1Resp = await callDeepSeek(phase1Messages, 0.0, 2000);
    let analisis = phase1Resp.content;
    try {
      analisis = JSON.stringify(JSON.parse(analisis.replace(/```json/g, '').replace(/```/g, '')));
    } catch (e) {}

    // Fase 2
    const phase2Messages = [
      { role: 'system', content: 'Reescribe el texto usando el análisis previo y la guía de humanización. Solo devuelve el texto final.' },
      { role: 'user', content: `ANÁLISIS:\n${analisis}\n\nGUÍA:\n${PHASE_2_GUIDE}\n\nORIGINAL:\n${original}` }
    ];
    const phase2Resp = await callDeepSeek(phase2Messages, 0.55, MAX_TOKENS);
    let rewritten = phase2Resp.content.replace(/```[\s\S]*?```/g, '').replace(/^texto reescrito:?\s*/i, '').trim();

    res.json({
      text: rewritten,
      usage: {
        totalTokens: (phase1Resp.usage.total_tokens || 0) + (phase2Resp.usage.total_tokens || 0)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function callDeepSeek(messages, temperature, maxTokens) {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: false
    })
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return {
    content: data.choices[0].message.content,
    usage: data.usage
  };
}

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));