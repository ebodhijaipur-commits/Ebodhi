import React from 'react';
import { Send, Inbox, CheckCircle2, Phone, Mail } from 'lucide-react';

/**
 * Continuous contact pipeline — different from About’s scene reel.
 * One looping stage: compose → fly → inbox → sort → reply.
 */
export default function ContactHeroReel() {
  return (
    <div className="contact-pipeline" aria-label="Message journey from send to reply">
      <div className="contact-pipeline-stage">
        {/* Lane labels */}
        <div className="contact-pipe-labels" aria-hidden="true">
          <span>You</span>
          <span>Send</span>
          <span>Inbox</span>
          <span>Sorted</span>
        </div>

        {/* Composer card */}
        <div className="contact-pipe-composer">
          <div className="contact-pipe-composer-top">
            <Mail size={14} />
            <em>New inquiry</em>
          </div>
          <div className="contact-pipe-type">
            <span className="contact-pipe-line" />
            <span className="contact-pipe-line is-mid" />
            <span className="contact-pipe-line is-short" />
            <i className="contact-pipe-caret" />
          </div>
          <div className="contact-pipe-send-btn">
            <Send size={14} />
            Send
          </div>
        </div>

        {/* Flight path + packet */}
        <div className="contact-pipe-flight" aria-hidden="true">
          <svg className="contact-pipe-svg" viewBox="0 0 280 80" fill="none" preserveAspectRatio="none">
            <path
              className="contact-pipe-dash"
              d="M8 40 C 70 8, 120 72, 180 40 S 250 20, 272 40"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="contact-pipe-packet">
            <Send size={14} />
          </div>
        </div>

        {/* Inbox stack */}
        <div className="contact-pipe-inbox">
          <div className="contact-pipe-inbox-head">
            <Inbox size={14} />
            Desk inbox
            <b>LIVE</b>
          </div>
          <div className="contact-pipe-mail contact-pipe-mail-a">Campus visit?</div>
          <div className="contact-pipe-mail contact-pipe-mail-b">Batch timings</div>
          <div className="contact-pipe-mail contact-pipe-mail-c is-incoming">Your message</div>
        </div>

        {/* Sort columns */}
        <div className="contact-pipe-sort">
          <div className="contact-pipe-col">
            <span>Programs</span>
            <i />
          </div>
          <div className="contact-pipe-col is-hot">
            <span>Callbacks</span>
            <i className="is-card" />
          </div>
          <div className="contact-pipe-col">
            <span>Campus</span>
            <i />
          </div>
        </div>

        {/* Reply chip */}
        <div className="contact-pipe-reply">
          <CheckCircle2 size={16} />
          <div>
            <strong>Sorted &amp; assigned</strong>
            <em>We&apos;ll get back with next steps</em>
          </div>
          <Phone size={14} className="contact-pipe-reply-phone" />
        </div>
      </div>
    </div>
  );
}
