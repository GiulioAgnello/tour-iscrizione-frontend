import "./Privacy.css";

export default function Privacy() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Informativa sul trattamento dei dati personali</p>
        </div>
      </div>

      <section className="section">
        <div className="container privacy-wrap">
          <p className="privacy-updated">
            Ai sensi degli artt. 13–14 del Regolamento UE 2016/679 (GDPR) —
            ultimo aggiornamento: giugno 2026
          </p>

          <h2>1. Titolare del trattamento</h2>
          <p>
            Il titolare del trattamento è{" "}
            <strong>Motoclub Salentum Terrae A.S.D</strong>, con sede in{" "}
            <em> Viale Ugo Foscolo, 1, 73100 Lecce LE, Italia</em>,
            <strong> CF:93130820751</strong>. contattabile all'indirizzo{" "}
            <a href="mailto:motoclubsalentumterrae@gmail.com">
              motoclubsalentumterrae@gmail.com
            </a>
            .
          </p>

          <h2>2. Dati raccolti e finalità</h2>
          <p>
            Il sito raccoglie dati personali attraverso due punti di contatto:
            il modulo di iscrizione al tour e il modulo di contatto.
          </p>

          <h3>Modulo di iscrizione</h3>
          <p>
            Per completare l'iscrizione raccogliamo i seguenti dati del{" "}
            <strong>motociclista</strong>: cognome e nome, luogo e data di
            nascita, città di residenza e indirizzo, numero di cellulare,
            indirizzo email, taglia abbigliamento, modello e targa della moto.
            Sono inoltre richiesti in allegato la{" "}
            <strong>foto o scansione della patente di guida</strong> e la{" "}
            <strong>ricevuta del bonifico bancario</strong> a comprova del
            pagamento della quota.
          </p>
          <p>
            I medesimi dati anagrafici e di contatto vengono raccolti, su base{" "}
            <strong>facoltativa</strong>, per un eventuale passeggero/a che
            partecipa al tour.
          </p>
          <p>
            La base giuridica del trattamento è l'
            <strong>esecuzione di un contratto</strong> (art. 6, par. 1, lett. b
            GDPR): i dati sono necessari per gestire la domanda di
            partecipazione, verificare i requisiti, preparare il materiale per i
            partecipanti e organizzare la logistica dell'evento.
          </p>

          <h3>Registrazione del consenso</h3>
          <p>
            Al momento dell'invio del modulo vengono registrati l'
            <strong>indirizzo IP</strong> e il <strong>timestamp</strong> del
            consenso, al fine di documentare l'accettazione dell'informativa
            privacy e delle condizioni di partecipazione (obbligo di
            accountability ai sensi dell'art. 5, par. 2 GDPR).
          </p>

          <h3>Modulo di contatto</h3>
          <p>
            Tramite il form "Contatti" raccogliamo nome, email e testo del
            messaggio. La base giuridica è il <strong>consenso</strong> (art. 6,
            par. 1, lett. a GDPR), liberamente prestato compilando il modulo. I
            dati vengono utilizzati esclusivamente per rispondere alla richiesta
            e non vengono conservati oltre il tempo necessario a farlo.
          </p>

          <h2>3. Modalità di trattamento e conservazione</h2>
          <p>
            I dati vengono trattati con strumenti elettronici su server
            protetti. I documenti allegati (patente, bonifico) sono archiviati
            nella media library del sito e accessibili esclusivamente agli
            amministratori autorizzati.
          </p>
          <p>
            I dati relativi all'iscrizione sono conservati per il tempo
            strettamente necessario alle finalità indicate e comunque non oltre{" "}
            <strong>2 anni</strong> dalla conclusione dell'evento, salvo diverso
            obbligo di legge (es. fiscale o contabile).
          </p>

          <h2>4. Comunicazione a terzi</h2>
          <p>
            I dati non vengono ceduti né venduti a terzi. Possono essere
            comunicati esclusivamente a:
          </p>
          <ul>
            <li>
              Fornitori di servizi tecnici (hosting, piattaforma CMS) che
              agiscono in qualità di
              <em> responsabili del trattamento</em> ai sensi dell'art. 28 GDPR;
            </li>
            <li>Autorità competenti, ove richiesto dalla legge.</li>
          </ul>
          <p>
            Non è previsto alcun trasferimento di dati al di fuori dello Spazio
            Economico Europeo.
          </p>

          <h2>5. I tuoi diritti</h2>
          <p>
            In qualità di interessato hai diritto di accedere ai tuoi dati,
            richiederne la rettifica o la cancellazione, opporti al trattamento,
            richiederne la limitazione e ottenerne la portabilità in formato
            leggibile (artt. 15–22 GDPR).
          </p>
          <p>
            Per esercitare i tuoi diritti scrivi a{" "}
            <a href="mailto:[email@organizzatore.it]">
              [email@organizzatore.it]
            </a>
            . Hai inoltre il diritto di proporre reclamo al Garante per la
            protezione dei dati personali (
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noreferrer"
            >
              garanteprivacy.it
            </a>
            ).
          </p>

          <h2>6. Cookie</h2>
          <p>
            Il sito utilizza esclusivamente cookie tecnici necessari al
            funzionamento della piattaforma. Non vengono installati cookie di
            profilazione o di tracciamento di terze parti. Le preferenze sui
            cookie possono essere gestite tramite il banner presente al primo
            accesso.
          </p>
        </div>
      </section>
    </>
  );
}
