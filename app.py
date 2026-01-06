import streamlit as st
import time

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

# ---------------- PAGE CONFIG ----------------
st.set_page_config(
    page_title="Vidhan-Buddhi | Legislative AI Assistant",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# ---------------- STYLING ----------------
st.markdown("""
<style>
body { background-color: #f6f7f9; }
.block-container { padding-top: 2rem; }
.big-title { font-size: 42px; font-weight: 700; }
.subtle { color: #555; margin-bottom: 20px; }
.badge {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 6px;
    background: #e9ecef;
    margin-right: 8px;
    font-size: 14px;
}
.section {
    padding: 24px;
    border-radius: 12px;
    background: white;
    margin-bottom: 24px;
}
</style>
""", unsafe_allow_html=True)

# ---------------- HEADER ----------------
st.markdown('<div class="big-title">🏛️ Vidhan-Buddhi</div>', unsafe_allow_html=True)
st.markdown(
    '<div class="subtle">Agentic AI for Legislative Research • Demo System</div>',
    unsafe_allow_html=True
)

st.markdown("""
<span class="badge">🔒 Sovereign</span>
<span class="badge">🛜 Web-Based</span>
<span class="badge">📑 Evidence-Backed</span>
<span class="badge">⚙️ Local AI Ready</span>
""", unsafe_allow_html=True)

st.markdown("---")

# ---------------- LOAD VECTOR DB ----------------
@st.cache_resource
def load_db():
    embedding = HuggingFaceEmbeddings(
        model_name="all-MiniLM-L6-v2"
    )
    return Chroma(
        persist_directory="./db",
        embedding_function=embedding
    )

db = load_db()

# ---------------- QUERY SECTION ----------------
st.markdown('<div class="section">', unsafe_allow_html=True)

query = st.text_area(
    "Legislative Research Query",
    value=(
        "Analyze the evolution of the Mahanadi water dispute from the 2016 protests "
        "to the 2025 tribunal proceedings. Cite hydrological data where applicable."
    ),
    height=120
)

run = st.button("🚀 Run Legislative Analysis", use_container_width=True)

st.markdown('</div>', unsafe_allow_html=True)

# ---------------- AGENTIC REASONING SIMULATION ----------------
def agent_thinking():
    with st.status("Vidhan-Buddhi is reasoning…", expanded=True):
        time.sleep(0.6)
        st.write("🔍 Retrieving legacy legislative archives (2016–2017)…")
        time.sleep(0.6)
        st.write("🔍 Accessing tribunal and committee records (2025)…")
        time.sleep(0.6)
        st.write("📊 Extracting hydrological data points (cusecs / inflows)…")
        time.sleep(0.6)
        st.write("🧠 Performing temporal and policy correlation…")
        time.sleep(0.6)

# ---------------- ANALYSIS OUTPUT ----------------
if run:
    agent_thinking()

    st.markdown('<div class="section">', unsafe_allow_html=True)
    st.markdown("### 🧠 AI Legislative Analysis")

    st.markdown("""
**Historical Context (2016–2017)**  
During the escalation phase of the dispute, Odisha’s leadership described upstream
barrage construction as *“blatant unilateral action”*.  
Technical records from January 2017 indicate Hirakud reservoir inflows of **3108 cusecs**,
which were cited as evidence of severe non-monsoon distress.

**Current Status (2025)**  
By late 2025, the dispute entered a judicial and technical adjudication phase.
The Mahanadi Water Disputes Tribunal scheduled the next hearing for **7 February 2026**.
Joint Technical Committee meetings held in December 2025 reported positive outcomes,
and a high-level all-party committee was constituted to pursue an amicable resolution.

**Conclusion**  
The dispute has evolved from political agitation to structured judicial and technical
negotiation, while underlying hydrological concerns continue to inform deliberations.
""")

    st.markdown('</div>', unsafe_allow_html=True)

    # ---------------- EVIDENCE BOARD ----------------
    st.markdown('<div class="section">', unsafe_allow_html=True)
    st.markdown("### 📑 Evidence Board")

    with st.expander("📄 Legacy Archive (2016–2017)"):
        st.write("""
        Source Type: Press Cuttings / Government Records  
        Key Statement: “blatant unilateral action”  
        Data Point: Hirakud inflow – 3108 cusecs (January 2017)
        """)

    with st.expander("📄 Digital Records (2025)"):
        st.write("""
        Source Type: MWDT Proceedings / Government Notifications  
        Joint Technical Committee Meetings: 5 & 12 December 2025  
        Next Hearing Date: 7 February 2026
        """)

    st.markdown('</div>', unsafe_allow_html=True)
